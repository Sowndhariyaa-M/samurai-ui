import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

require('./index.css')

const Card = (props) => {

    const [openCard, setOpenCard] = useState(false);

    const stringToColor = (string) => {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    const getInitials = (name) => {
        let initials = '';
        if (name) {
            initials = name.split(" ").map((n) => n[0]).join(" ");
        }
        return initials
    }

    const handleOnImageClick = (level, value) => {
        if (level) {
            switch (level) {
                case 1:
                    // props.setBackSelected(false)
                    props.setSelectedValue(value);
                    props.setLevel(2);
                    break;
                case 2:
                    // props.setBackSelected(false)
                    props.setSelectedValue(value);
                    props.setLevel(3);
                    break;
                case 3:
                    setOpenCard(!openCard)
                    break;
            }
        }

    }

    return (
        <React.Fragment>
            <motion.div layout className={openCard ? 'card-div-open' : 'card-div'}>
                {openCard ?
                    <motion.div
                        layout className='card-div-open-continer'
                        onClick={() => handleOnImageClick(props?.level, props?.data.Value ?? props?.data?.Name)}
                    >
                        <motion.div layout style={{ display: 'flex' }}>
                            <motion.div
                                layout="position"
                                className='card-img-div-open'
                                style={{ backgroundColor: stringToColor(props?.data?.Name) }}
                            >
                                {props.data.Photo ? <img src={props?.data?.Photo ?? ''} alt='photo'/> :
                                    <motion.div
                                        layout="position"
                                        style={{ fontSize: '32px', color: 'white' }}
                                    >
                                        {getInitials(props?.data?.Name)}
                                    </motion.div>
                                }
                            </motion.div>
                            <motion.div layout="position" className='card-layer-1-content-open'>
                                <motion.div>
                                    {props?.data?.Name}
                                </motion.div>
                                <motion.div className='card-open-sub-heading'>
                                    <div>Email: &nbsp;</div>
                                    <div>{props?.data?.['Email Id']}</div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.div layout className='card-layer-2-open'>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12} sm={12} md={6}>
                                    <div>Employee ID</div>
                                    <div>{props?.data?.['Nokia Id']}</div>
                                </Grid> */}
                                <Grid item xs={12} sm={12} md={6}>
                                    <div>Event Team</div>
                                    <div>{props?.data?.EventTeamName}</div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <div>Team</div>
                                    <div>{props?.data?.Team}</div>
                                </Grid>
                            </Grid>
                        </motion.div>

                    </motion.div>
                    : <motion.div layout>
                        <motion.div
                            layout="position"
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 1 },
                            }}
                            transition={{ ease: "easeOut", duration: 2 }}
                            whileTap={{ scale: 0.9 }}
                            className='card-img-div'
                            style={{ backgroundColor: stringToColor(props?.data?.Name) }}
                            onClick={() => handleOnImageClick(props?.level, props?.data.Value ?? props?.data?.Name)}
                        >
                            {props.data.Photo ?
                                <img src={props?.data?.Photo ?? ''} alt='photo' /> :
                                <motion.div
                                    layout="position"
                                    style={{ fontSize: props?.level === 2 ? '40px' : '52px', color: 'white' }}
                                >
                                    {getInitials(props?.data?.Name)}
                                </motion.div>
                            }
                        </motion.div>
                        <motion.div className='card-h1'>{props?.data?.Name ?? ''}</motion.div>
                    </motion.div>}

            </motion.div>
        </React.Fragment>
    )
}

export default Card