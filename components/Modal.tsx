import { Box, Modal as MUIBackdrop, SxProps } from "@mui/material";
import React from "react";

interface ModalProps extends React.ComponentProps<typeof MUIBackdrop> {
    className?: string;
}

const FlexCenter: SxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const ModalStyle: SxProps = {
    ...FlexCenter,
    backgroundColor: "#232323",
    color: "#fff",
    maxWidth: "70%",
    minWidth: "55%",
    padding: 4
}

const BackdropStyle: SxProps = {
    ...FlexCenter,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
}

const Modal: React.FC<ModalProps> = ({ children, className, ...restProps }) => {
    return(
        <MUIBackdrop sx={BackdropStyle} {...restProps}>
            <Box className={className} sx={ModalStyle}>
                { children }
            </Box>
        </MUIBackdrop>
    )
}

export default Modal;