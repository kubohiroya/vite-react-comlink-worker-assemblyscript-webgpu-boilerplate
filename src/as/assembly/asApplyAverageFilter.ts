import { ASImageObjects } from "./ASImageObjects";

export function applyAverageFilter(id: u32, iteration: i32): void {
    const imageObject = ASImageObjects.getSingleton().get(id);
    if (!imageObject) throw new Error("Invalid ImageObject ID");
    _applyAverageFilter(imageObject.width, imageObject.height, imageObject.data, iteration);
}

function _applyAverageFilter(
    width: i32,
    height: i32,
    outputData: Uint8ClampedArray,
    iteration: i32
): void{
    const inputData = new Uint8ClampedArray(u32(width * height * 4));

    // console.log('in');
    // console.log(outputData[4096+4].toString());

    for (let c: i32 = 0; c < iteration; c++) {
        postProgressMessage(c, iteration);
        inputData.set(outputData);

        for (let y: i32 = 1; y < height - 1; y++) {
            for (let x: i32 = 1; x < width - 1; x++) {
                let r: u32 = 0,
                    g: u32 = 0,
                    b: u32 = 0,
                    a: u32 = 0;

                for (let dy: i32 = -1; dy <= 1; dy++) {
                    for (let dx: i32 = -1; dx <= 1; dx++) {
                        const index: u32 = u32((width * (y + dy) + (x + dx)) * 4);
                        r += unchecked(inputData[index + 0]);
                        g += unchecked(inputData[index + 1]);
                        b += unchecked(inputData[index + 2]);
                        a += unchecked(inputData[index + 3]);
                    }
                }
                const i: u32 = u32((width * y + x) * 4);
                unchecked((outputData[i + 0] = r / 9));
                unchecked((outputData[i + 1] = g / 9));
                unchecked((outputData[i + 2] = b / 9));
                unchecked((outputData[i + 3] = a / 9));
            }
        }
    }

    // console.log('out');
    // console.log(outputData[4096+4].toString());

    postProgressMessage(iteration, iteration);
}

// @ts-ignore: decorator
@external("env", "postProgressMessage")
export declare function postProgressMessage(value: u32, maxValue: u32): void;
