import { DoubleBufferingImageObject } from "../../models/DoubleBufferingImageObject";
import { ImageObject } from "../../models/ImageObject";
import { ProgressMonitor } from "../../types/ProgressMonitor";

export function applyAverageFilterDoubleBuffered(
    sourceImageObject: ImageObject,
    iteration: number,
    progressMonitor: ProgressMonitor,
): void {
    const { width, height } = sourceImageObject;

    const imageObject = new DoubleBufferingImageObject(sourceImageObject);

    [...Array(iteration)].forEach((_: any, index:number)=>{

        imageObject.setCurrentIndex(index);

        progressMonitor({
            value: imageObject.currentIndex,
            valueMax: iteration,
        });

        const inputData = imageObject.getInputData();
        const outputData = imageObject.getOutputData();
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let r = 0,
                    g = 0,
                    b = 0,
                    a = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const index = ((y + dy) * width + (x + dx)) * 4;
                        r += inputData[index + 0] & 0xff;
                        g += inputData[index + 1] & 0xff;
                        b += inputData[index + 2] & 0xff;
                        a += inputData[index + 3] & 0xff;
                    }
                }
                const i = (y * width + x) * 4;
                outputData[i] = Math.floor(r / 9) & 0xff;
                outputData[i + 1] = Math.floor(g / 9) & 0xff;
                outputData[i + 2] = Math.floor(b / 9) & 0xff;
                outputData[i + 3] = Math.floor(a / 9) & 0xff;
            }
        }
    });

    if (iteration % 2 === 0) {
        imageObject.copyData2ToData1();
    }

    progressMonitor({
        value: iteration,
        valueMax: iteration,
    });
}
