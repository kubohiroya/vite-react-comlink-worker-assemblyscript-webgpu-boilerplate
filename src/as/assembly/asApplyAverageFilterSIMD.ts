import { ASImageObjects } from "./ASImageObjects";

export function applyAverageFilterSIMD(id: u32, iteration: i32): void {
    const imageObject = ASImageObjects.getSingleton().get(id);
    if (!imageObject) throw new Error("Invalid ImageObject ID");

    _applyAverageFilterSIMD(imageObject.id, imageObject.width, imageObject.height, imageObject.data, iteration);
}

function _applyAverageFilterSIMD(
    id: u32,
    width: u32,
    height: u32,
    outputData: Uint8ClampedArray,
    iteration: u32
): void{
    const inputData = new Uint8ClampedArray(u32(width * height * 4));

    // 乗算で平均を計算 (1/9 を乗算: 0.1111... ≈ 285 / 256)
    const factor = v128.splat<i32>(285); // 乗算係数 (285 / 256 ≈ 1/9)
    const mask = v128.splat<i32>(0xFF);

    console.log('in');
    console.log(outputData[1025*4].toString());

    for (let c: u32 = 0; c < iteration; c++) {
        postProgressMessage(id, c, iteration);
        inputData.set(outputData);

        for (let y: u32 = 1; y < height - 1; y++) {
            for (let x: u32 = 1; x < width - 1; x += 4) { // SIMD processes 4 pixels at a time
                // TODO
            }
        }
    }

    console.log('out');
    console.log(outputData[1025*4].toString());

    postProgressMessage(id, iteration, iteration);
}

// @ts-ignore: decorator
@external("env", "postProgressMessage")
export declare function postProgressMessage(id: u32, value: u32, maxValue: u32): void;
