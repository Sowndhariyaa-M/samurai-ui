import Warriors from '../../assets/team-images/warrier.PNG'
import Ninjas from '../../assets/team-images/ninjas.png'
import Knights from '../../assets/team-images/knight.png'
import Samurais from '../../assets/team-images/samurai.png'

export const TeamImages = [
    { Name: 'Warriors', Photo: Warriors },
    { Name: 'Ninjas', Photo: Ninjas },
    { Name: 'Knights', Photo: Knights },
    { Name: 'Samurais', Photo: Samurais }];


function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}

export const EmployeeImages = importAll(require.context('../../assets/employee-photos', false, /\.(png|jpe?g|svg)$/));

export const BusinessUnitImages = importAll(require.context('../../assets/business-unit-images', false, /\.(png|jpe?g|svg)$/));

