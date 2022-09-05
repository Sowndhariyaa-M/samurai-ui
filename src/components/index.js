import React, { useEffect } from 'react';
import BackgroundVideo from './background-video/background-video';
import { employeeData } from './resource';
import img1 from '../assets/people-images/img1.jpg'
import img2 from '../assets/people-images/img2.jpg'
import img3 from '../assets/people-images/img3.jpg'
import img4 from '../assets/people-images/img4.jpg'
import img5 from '../assets/people-images/img5.jpg'
import img6 from '../assets/people-images/img6.jpg'
import LandingCards from './landing-cards';
import{read, utils} from 'xlsx';
require('./index.css')


const MainPage = () => {

    // useEffect(() => {
    //     let newDataSet = []
    //     if (employeeData && employeeData.employeeData) {
    //         employeeData.employeeData.forEach((item) => {
    //             newDataSet.push({
    //                 ...item,
    //                 LocalRecidence: localRecidence[Math.floor(Math.random() * localRecidence.length)],
    //                 SchoolName: schoolName[Math.floor(Math.random() * schoolName.length)],
    //                 PreviousOrg: previousOrg[Math.floor(Math.random() * previousOrg.length)],
    //                 BikeBrands: bikeBrands[Math.floor(Math.random() * bikeBrands.length)],
    //                 CarBrands: carBrands[Math.floor(Math.random() * carBrands.length)],
    //                 PrimaryHobby: primaryHobby[Math.floor(Math.random() * primaryHobby.length)],

    //             })
    //         })
    //     }
    //     console.log(JSON.stringify(newDataSet))
    // }, [])

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                console.log(JSON.stringify(json));
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    return (
        <React.Fragment>
            <div className='main-page'>
                <div className='main-overlay' />
                <BackgroundVideo />
                <div className='main-content'>
                    <LandingCards />
                    {/* <label htmlFor="upload">Upload File</label>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={readUploadFile}
                    /> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainPage