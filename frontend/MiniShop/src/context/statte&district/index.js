import AndamanNicobarIsland from "./states/andamanNicobarislands.js"
import AndhraPradesh from "./states/andhraPradesh.js"
import ArunachalPradesh from "./states/arunachalPradesh.js"
import Assam from "./states/assam.js"
import Bihar from "./states/bihar.js"
import Chandigarh from "./states/chandigarh.js"
import Chhattisgarh from "./states/chhattisgarh.js"
import DadraNagarHaveli from "./states/dadraNagarHaveli.js"
import DamanDiu from "./states/damanDiu.js"
import Delhi from "./states/delhi.js"
import Goa from "./states/goa.js"
import Gujarat from "./states/gujarat.js"
import Haryana from "./states/haryana.js"
import HimachalPradesh from "./states/himachalPradesh.js"
import JammuKashmir from "./states/jammuKashmir.js"
import Jharkhand from "./states/jharkhand.js"
import Karnataka from "./states/karnataka.js"
import Kerala from "./states/kerala.js"
import Ladakh from "./states/ladakh.js"
import Lakshadweep from "./states/lakshadweep.js"
import MadhyaPradesh from "./states/madhyaPradesh.js"
import Maharashtra from "./states/maharashtra.js"
import Manipur from "./states/manipur.js"
import Meghalaya from "./states/meghalaya.js"
import Mizoram from "./states/mizoram.js"
import Nagaland from "./states/nagaland.js"
import Odisha from "./states/odisha.js"
import Puducherry from "./states/puducherry.js"
import Punjab from "./states/punjab.js"
import Rajasthan from "./states/rajasthan.js"
import Sikkim from "./states/sikkim.js"
import TamilNadu from "./states/tamilNadu.js"
import Telangana from "./states/telangana.js"
import Tripura from "./states/tripura.js"
import Uttarakhand from "./states/uttarakhand.js"
import UttarPradesh from "./states/uttarPradesh.js"
import WestBengal from "./states/westBengal.js"

const districtsByState = {
    // STATES
    "Andhra Pradesh": AndhraPradesh,
    "Arunachal Pradesh": ArunachalPradesh,
    "Assam": Assam,
    "Bihar": Bihar,
    "Chhattisgarh": Chhattisgarh,
    "Goa": Goa,
    "Gujarat": Gujarat,
    "Haryana": Haryana,
    "Himachal Pradesh": HimachalPradesh,
    "Jharkhand": Jharkhand,
    "Karnataka": Karnataka,
    "Kerala": Kerala,
    "Madhya Pradesh": MadhyaPradesh,
    "Maharashtra": Maharashtra,
    "Manipur": Manipur,
    "Meghalaya": Meghalaya,
    "Mizoram": Mizoram,
    "Nagaland": Nagaland,
    "Odisha": Odisha,
    "Punjab": Punjab,
    "Rajasthan": Rajasthan,
    "Sikkim": Sikkim,
    "Tamil Nadu": TamilNadu,
    "Telangana": Telangana,
    "Tripura": Tripura,
    "Uttar Pradesh": UttarPradesh,
    "Uttarakhand": Uttarakhand,
    "West Bengal": WestBengal,

    // UNION TERRITORIES
    "Andaman and Nicobar Islands": AndamanNicobarIsland,
    "Chandigarh": Chandigarh,
    "Dadra and Nagar Haveli": DadraNagarHaveli,
    "Daman and Diu": DamanDiu, 
    "Delhi": Delhi,
    "Jammu and Kashmir": JammuKashmir,
    "Ladakh": Ladakh,
    "Lakshadweep": Lakshadweep,
    "Puducherry": Puducherry
};

export default districtsByState;
