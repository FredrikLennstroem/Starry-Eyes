import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/InfoOutlined';

function InfoIconButton({ tooltipText }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Tooltip
            open={open}
            onClose={handleClose}
            title={tooltipText}
            placement="right"
            arrow
            
        >
            <IconButton onClick={handleOpen}>
                <InfoIcon sx={{ color: "#667784" }} />
            </IconButton>
        </Tooltip>
    );
}

export default InfoIconButton;
