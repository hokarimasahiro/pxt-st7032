/**
 * lcd st7032 blocks
 */
//% weight=100 color=#0fbc11 icon="\uf3fa"
namespace st7032 {
    let i2cAddress = 0x3f;
    let topAddress = [0x00,0x40,0x14,0x54];
    let initFlag = 0;

    //% block="put command $data"
    //% block.loc.ja="コマンド|$data|の書き込み"
    export function putCommand(data: number) {
        let buf = pins.createBuffer(2);
        buf[0] = 0x00;
        buf[1] = data >> 0;
        pins.i2cWriteBuffer(i2cAddress, buf);
    }

    //% block="put data $data"
    //% block.loc.ja="データ|$data|の書き込み"
    export function putData(data: number) {
        let buf = pins.createBuffer(2);
        buf[0] = 0x40;
        buf[1] = data >> 0;
        pins.i2cWriteBuffer(i2cAddress, buf);
    }

    //% block="set i2cAddress $ad"
    //% block.loc.ja="i2cアドレスを|$ad|に変更する"
    export function setAddress(ad:number): void {
        i2cAddress = ad;
    }
    /**
     * initLcd
     */
    //% block="init lcd"
    //% block.loc.ja="lcdの初期化"
    export function initLcd(): void {
        putCommand(0x38);
        putCommand(0x01);
        putCommand(0x02);
        putCommand(0x0c);
        initFlag = 1;
    }

    //% block="set position x $x y $y"
    //% block.loc.ja="表示開始位置を|$x|行、|$y|列にする"
    export function setPosition(x:number,y:number): void {
        if((x > 3) || (y > 20)) return;
        if(initFlag = 0) initLcd();
        putCommand( 0x80 + topAddress[x] + y);
    }
    //% block="write data $dt"
    //% block.loc.ja="lcdに|$dt|を表示する"
    export function writeData(dt:string): void {
        if (initFlag = 0) initLcd();
        for(let i = 0;i < dt.length;i++)
            putData(dt.charCodeAt(i));
    }
}
