import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import BackIcon from '../../assets/back-icon.png';
import HomeIcon from '../../assets/home.jpg';
import businessUnit from '../../assets/landing-images/businessUnit.jpg';
import Avatar from '../../assets/unisex-avatar.jpg';
import team from '../../assets/landing-images/team.jpg';
import Card from '../card/index';
import { EmployeeImages, TeamImages } from '../image-collection/image-collection';
import { employeeData } from '../resource';

require('./index.css')

const landingOptions = [
    { Name: 'Business Unit', Value: 'Team', Photo: businessUnit },
    { Name: 'Team', Value: 'EventTeamName', Photo: team }
]

const LandingCards = (props) => {

    const [updatedEmployeeData, setUpdatedEmployeeData] = useState([])
    const [width, setWidth] = useState(0);
    const [level, setLevel] = useState(1);
    const [selectedValue, setSelectedValue] = useState('')
    const [dataSet, setDataSet] = useState([]);
    const [level1Dataset, setLevel1Dataset] = useState([]);
    const [level2Dataset, setLevel2Dataset] = useState([]);
    const [level3Dataset, setLevel3Dataset] = useState([]);
    const [backSelected, setBackSelected] = useState(false);
    const landingCard = useRef();

    useEffect(() => {
        setWidth(landingCard.current.scrollWidth - landingCard.current.offsetWidth);
        setDataSet(landingOptions);
        setLevel1Dataset(landingOptions)

    }, [])

    useEffect(() => {
        let updatedEmployeeData = [...employeeData]
        console.log('employeeData', employeeData.length)
        if (employeeData?.length && EmployeeImages) {
            console.log('inside ')
            employeeData.forEach((item, index) => {
                if (item["Nokia Id"]) {
                    for (const key in EmployeeImages) {
                        if (key?.includes("_" + item["Nokia Id"] + '_')) {
                            updatedEmployeeData[index]['Photo'] = EmployeeImages[key]
                        }
                    }
                }
            })
        }
        if (updatedEmployeeData?.length) {
            updatedEmployeeData.forEach(item => {
                if (!item?.Photo) {
                    item.Photo = Avatar
                }
            })
        }
        setUpdatedEmployeeData(updatedEmployeeData)
    }, [employeeData])

    const getFilteredDataSet = () => {
        let dataSet = []
        let photo = ''
        if (level && selectedValue && !backSelected) {
            if (level === 2) {
                updatedEmployeeData?.forEach(item => {
                    if (item[selectedValue]) {
                        if (selectedValue === 'EventTeamName') {
                            TeamImages?.forEach(i => {
                                if (item[selectedValue] === i.Name) {
                                    photo = i.Photo
                                }
                            })
                        }
                        dataSet.push({
                            Name: item[selectedValue],
                            Photo: photo ?? undefined
                        })
                    }
                })

                if (dataSet?.length) {
                    dataSet = [...new Map(dataSet.map(item =>
                        [item.Name, item])).values()];
                }
                setDataSet(dataSet)
                setLevel2Dataset(dataSet)

            }
            if (level === 3) {
                updatedEmployeeData?.forEach(item => {
                    if (Object.values(item).includes(selectedValue)) {
                        dataSet.push(item)
                    }
                })
                setDataSet(dataSet)
                setLevel3Dataset(dataSet)
            }
            setBackSelected(false)
        } else if (backSelected && level) {
            if (level === 2) {
                setDataSet(level2Dataset)
            }
            else if (level === 1) {
                setDataSet(level1Dataset)
            }
            setBackSelected(false)
        }
    }

    const handleBackClick = () => {
        setBackSelected(true)
        if (level === 3) {
            setLevel(2)
        }
        else if (level === 2) {
            setLevel(1)
        }
    }

    const handleHomeClick = () => {
        setBackSelected(true)
        setLevel(1)
    }


    useEffect(() => {
        getFilteredDataSet()
    }, [level])

    useEffect(() => {
        console.log(dataSet)
    }, [dataSet])

    return (
        <React.Fragment>
            {(level !== 1) && <motion.div
                layout="position"
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 1 },
                }}
                transition={{ ease: "easeOut", duration: 2 }}
                whileTap={{ scale: 0.9 }}
                className='landing-card-back-button-container'
                onClick={() => handleBackClick()}
            >
                <img src={BackIcon} />
            </motion.div>}
            {(level !== 1) && <motion.div
                layout="position"
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 1 },
                }}
                transition={{ ease: "easeOut", duration: 2 }}
                whileTap={{ scale: 0.9 }}
                className='landing-card-back-button-container'
                onClick={() => handleHomeClick()}
                style={{ left: '80px' }}
            >
                <span style={{ fontSize: '40px', cursor: 'pointer' }}>H</span>
                {/* <img src={HomeIcon}/> */}
            </motion.div>}
            <motion.div
                ref={landingCard}
                whileTap={{ cursor: 'grabbing' }}
                className='landing-card-container'
            >
                <motion.div
                    drag="x"
                    dragConstraints={{
                        right: 0,
                        left: -width
                    }}
                    className='landing-card-div'
                >
                    {dataSet && dataSet.map(item => <Card
                        data={item}
                        level={level}
                        setLevel={setLevel}
                        setSelectedValue={setSelectedValue}
                        getFilteredDataSet={getFilteredDataSet}
                        setBackSelected={setBackSelected}
                    />)}
                </motion.div>
            </motion.div>

        </React.Fragment>
    )
}

export default LandingCards