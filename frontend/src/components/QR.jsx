import { QRCodeCanvas } from "qrcode.react";

const MiQR = ({ value }) => {
    return (
        <div>
            <QRCodeCanvas value={value} size={200} />
        </div>
    );
}

export default MiQR;