import { ASImageObjects } from "./ASImageObjects";

export function applyAverageFilter(id: u32, simd:boolean, iteration: i32): void {
    const imageObject = ASImageObjects.getSingleton().get(id);
    if (!imageObject) throw new Error("Invalid ImageObject ID");

    const width: i32 = imageObject.width;
    const height: i32 = imageObject.height;
    const outputData = imageObject.data;

    const inputData = new Uint8ClampedArray(u32(width * height * 4));

    // 乗算で平均を計算 (1/9 を乗算: 0.1111... ≈ 285 / 256)
    const factor = v128.splat<i32>(285); // 乗算係数 (285 / 256 ≈ 1/9)
    const mask = v128.splat<i32>(0xFF);

    for (let c = 0; c < iteration; c++) {
        postProgressMessage(c, iteration);
        inputData.set(outputData);

        for (let y: i32 = 1; y < height - 1; y++) {
            if(simd){
                for (let x: i32 = 1; x < width - 1; x += 4) { // SIMD processes 4 pixels at a time

                    let r = v128.splat<i32>(0);
                    let g = v128.splat<i32>(0);
                    let b = v128.splat<i32>(0);
                    let a = v128.splat<i32>(0);

                    for (let dy: i32 = -1; dy <= 1; dy++) {
                        for (let dx: i32 = -1; dx <= 1; dx++) {
                            if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) {
                                continue; // 範囲外の場合はスキップ
                            }
                            const index: u32 = u32((y + dy) * width + (x + dx)) * 4;

                            const pixel = v128.splat<u32>(0);
                            v128.load_lane<u8>(inputData.dataStart + index, pixel, 0); // Load 4 RGBA pixels
                            v128.load_lane<u8>(inputData.dataStart + index + 1, pixel, 1); // Load 4 RGBA pixels
                            v128.load_lane<u8>(inputData.dataStart + index + 2, pixel, 2); // Load 4 RGBA pixels
                            v128.load_lane<u8>(inputData.dataStart + index + 3, pixel, 3); // Load 4 RGBA pixels

                            // 各チャンネルを抽出して加算
                            r = i32x4.add(r, v128.and(pixel, mask));           // R成分
                            g = i32x4.add(g, v128.and(v128.shr<i32>(pixel, 8), mask));   // G成分
                            b = i32x4.add(b, v128.and(v128.shr<i32>(pixel, 16), mask));  // B成分
                            a = i32x4.add(a, v128.and(v128.shr<i32>(pixel, 24), mask));  // A成分
                        }
                    }

                    // 9ピクセル分の平均を計算 (スケーリング係数で割る)
                    r = i32x4.shr_s(i32x4.mul(r, factor), 8);
                    g = i32x4.shr_s(i32x4.mul(g, factor), 8);
                    b = i32x4.shr_s(i32x4.mul(b, factor), 8);
                    a = i32x4.shr_s(i32x4.mul(a, factor), 8);

                    // 平均化されたRGBAを1つのSIMDレジスタに再結合
                    const averagedPixel = v128.or(
                        v128.or(r, v128.shl<i32>(g, 8)),
                        v128.or(v128.shl<i32>(b, 16), v128.shl<i32>(a, 24))
                    );

                    const i: u32 = u32((y * width + x) * 4);
                    v128.store(outputData.dataStart + i, averagedPixel, 0, 4); // Store the averaged pixel
                }
            }else{
                for (let x = 1; x < width - 1; x++) {
                    let r: u32 = 0,
                        g: u32 = 0,
                        b: u32 = 0,
                        a: u32 = 0;

                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const index: u32 = u32((y + dy) * width + (x + dx)) * 4;
                            r += unchecked(inputData[index]);
                            g += unchecked(inputData[index + 1]);
                            b += unchecked(inputData[index + 2]);
                            a += unchecked(inputData[index + 3]);
                        }
                    }

                    const i: u32 = u32((y * width + x) * 4);
                    unchecked((outputData[i] = u32(r / 9)));
                    unchecked((outputData[i + 1] = u32(g / 9)));
                    unchecked((outputData[i + 2] = u32(b / 9)));
                    unchecked((outputData[i + 3] = u32(a / 9)));
                }
            }
        }
    }
    postProgressMessage(iteration, iteration);
}

// @ts-ignore: decorator
@external("env", "postProgressMessage")
export declare function postProgressMessage(value: u32, maxValue: u32): void;
