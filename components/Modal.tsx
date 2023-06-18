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
    maxWidth: "70%",
    minWidth: "55%",
    padding: 4,
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
            <Box className={`text-black bg-white dark:text-white dark:bg-gray-800 ${className}`} sx={ModalStyle}>
                { children }
            </Box>
        </MUIBackdrop>
    )
}

export default Modal;