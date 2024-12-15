@group(0) @binding(0) var<storage, read> inputImage: array<u32>;
@group(0) @binding(1) var<storage, read_write> outputImage: array<u32>;
@group(0) @binding(2) var<uniform> params: vec2<u32>; // width, height

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let width = params.x;
    let height = params.y;

    let x = global_id.x;
    let y = global_id.y;

    if(1 <= x && x < width - 1 && 1 <= y && y < height - 1) {

        var sum: vec4<u32> = vec4<u32>(0, 0, 0, 0);

        for (var dy: i32 = -1; dy <= 1; dy++) {
            for (var dx: i32 = -1; dx <= 1; dx++) {
                let index = u32(i32(y) + dy) * width + u32(i32(x) + dx);
                let color = inputImage[index];
                sum += vec4<u32>(
                    (color >> 0) & 0xFFu,
                    (color >> 8) & 0xFFu,
                    (color >> 16) & 0xFFu,
                    (color >> 24) & 0xFFu
                );
            }
        }

        let outputIndex = y * width + x;
        let avgColor = vec4<u32>(sum / 9);
        outputImage[outputIndex] = (avgColor.x & 0xFFu) |
                                   ((avgColor.y & 0xFFu) << 8) |
                                   ((avgColor.z & 0xFFu) << 16) |
                                   ((avgColor.w & 0xFFu) << 24);

    }
}
