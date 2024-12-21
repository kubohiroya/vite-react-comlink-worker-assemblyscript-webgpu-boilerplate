import { ASImageObjects } from "./ASImageObjects";

export function applyAverageFilterSIMD(id: u32, iteration: i32): void {
    const imageObject = ASImageObjects.getSingleton().get(id);
    if (!imageObject) throw new Error("Invalid ImageObject ID");

    _applyAverageFilterSIMD(imageObject.width, imageObject.height, imageObject.data, iteration);
}

function _applyAverageFilterSIMD(
    width: i32,
    height: i32,
    outputData: Uint8ClampedArray,
    iteration: i32
): void{
    const inputData = new Uint8ClampedArray(u32(width * height * 4));

    // 乗算で平均を計算 (1/9 を乗算: 0.1111... ≈ 285 / 256)
    const factor = v128.splat<i32>(285); // 乗算係数 (285 / 256 ≈ 1/9)
    const mask = v128.splat<i32>(0xFF);

    console.log('in');
    console.log(outputData[1025*4].toString());

    for (let c: i32 = 0; c < iteration; c++) {
        postProgressMessage(c, iteration);
        inputData.set(outputData);

        for (let y: i32 = 1; y < height - 1; y++) {
            for (let x: i32 = 1; x < width - 1; x += 4) { // SIMD processes 4 pixels at a time
                // TODO
            }
        }
    }

    console.log('out');
    console.log(outputData[1025*4].toString());

    postProgressMessage(iteration, iteration);
}

// @ts-ignore: decorator
@external("env", "postProgressMessage")
export declare function postProgressMessage(value: u32, maxValue: u32): void;
