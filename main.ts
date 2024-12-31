//%block="SnesMode7"
//%color="#6346e8"
//%icon="\uf018"
namespace mode7 {

    function CalculateMode7(ValA:number,ValB:number) {
        return ValA + 0.5 * ValB
    }

    //%blockid=mode7_isorender
    //%block=" draw isometric|from $Input to $Output by HighScroll: $H_scroll VectorScroll: $V_scroll Xmax: $A Xmin: $B Ymin: $C Ymax: $D"
    //%Input.shadow=screen_image_picker
    //%Output.shadow=variables_get
    //%weight=10
    export function IsoRender(Input: Image, Output: Image, H_scroll: number, V_scroll: number, A: number, B: number, C: number, D: number) {
        let Center_X = CalculateMode7(H_scroll,Output.width)
        let Center_Y = CalculateMode7(V_scroll,Output.height)
        for (let y = 0; y < Output.height; y++) {
            for (let x = 0; x < Output.width; x++) {
                Output.setPixel(x, y, Input.getPixel(Math.trunc(Center_X + (0.00390625 * A * (x + (H_scroll - Center_X)) + 0.00390625 * B * (y + (V_scroll - Center_Y)))), Math.trunc(Center_Y + (0.00390625 * C * (x + (H_scroll - Center_X)) + 0.00390625 * D * (y + (V_scroll - Center_Y))))))
            }
        }
    }

    //%blockid=mode7_perrender
    //%block=" draw perspective|from $Input to $Output by HighScroll: $H_scroll VectorScroll: $V_scroll Xmax: $A Xmin: $B Ymin: $C Ymax: $D SubHigh: $H_inc SubVector: $V_inc SubCenterX: CX_inc SubCenterY: $CY_inc SubXmax: $A_inc SubXmin: $B_inc SubYmin: $C_inc SubYmax: $D_inc"
    //%Input.shadow=screen_image_picker
    //%Output.shadow=variables_get
    //%weight=5
    export function PerRender(Input: Image, Output: Image, H_scroll: number, V_scroll: number, A: number, B: number, C: number, D: number, H_inc: number, V_inc: number, CX_inc: number, CY_inc: number, A_inc: number, B_inc: number, C_inc: number, D_inc: number) {
        let Center_X = CalculateMode7(H_scroll, Output.width)
        let Center_Y = CalculateMode7(V_scroll, Output.height)
        for (let y = 0; y < Output.height; y++) {
            for (let x = 0; x < Output.width; x++) {
                Output.setPixel(x, y, Input.getPixel(Math.floor(Center_X + y * CX_inc + (1 / (A + y * A_inc) * (x + (H_scroll + y * H_inc - (Center_X + y * CX_inc))) + (B + y * B_inc) * (y + (V_scroll + y * V_inc - (Center_Y + y * CY_inc))))), Math.floor(Center_Y + y * CY_inc + ((C + y * C_inc) * (x + (H_scroll + y * H_inc - (Center_X + y * CX_inc))) + 1 / (D + y * D_inc) * (y + (V_scroll + y * V_inc - (Center_Y + y * CY_inc)))))))
            }
        }
    }
}
