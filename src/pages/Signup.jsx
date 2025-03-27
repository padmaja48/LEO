import React, { useState } from "react";
import "../styles/Signup.css";

const countries = {
  
    "India": [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ], 
  "USA": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ], // --- USA STATES ARE ALREADY EXPANDED TO INCLUDE ALL 50 ---
    "Canada": ["Ontario", "British Columbia", "Quebec", "Alberta"],
    "UK": ["England", "Scotland", "Wales", "Northern Ireland"],
    "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia"],
    "Germany": ["Bavaria", "Berlin", "Hamburg", "Saxony"],
    "France": ["Île-de-France", "Normandy", "Provence-Alpes-Côte d'Azur"],
    "Italy": ["Lombardy", "Sicily", "Tuscany", "Veneto"],
    "Japan": ["Tokyo", "Osaka", "Hokkaido", "Kyoto"],
    "China": ["Beijing", "Shanghai", "Guangdong", "Shandong"],
    "Afghanistan": ["Badakhshan", "Badghis", "Baghlan", "Balkh"],
    "Albania": ["Berat", "Diber", "Durres", "Elbasan"],
    "Algeria": ["Adrar", "Ain Defla", "Ain Temouchent", "Algiers"],
    "Andorra": ["Andorra la Vella", "Canillo", "Encamp", "Escaldes-Engordany"],
    "Angola": ["Bengo", "Benguela", "Bie", "Cabinda"],
    "AntiguaandBarbuda": ["Saint George Parish", "Saint John Parish", "Saint Mary Parish", "Saint Paul Parish"],
    "Argentina": ["Buenos Aires", "Catamarca", "Chaco", "Chubut"],
    "Armenia": ["Aragatsotn", "Ararat", "Armavir", "Gegharkunik"],
    "Austria": ["Burgenland", "Carinthia", "Lower Austria", "Upper Austria"],
    "Azerbaijan": ["Absheron District", "Agjabadi", "Agdam District", "Agdash"],
    "Bahamas": ["Acklins", "Berry Islands", "Bimini", "Black Point"],
    "Bahrain": ["Capital Governorate", "Central Governorate", "Muharraq Governorate", "Northern Governorate"],
    "Bangladesh": ["Barisal", "Chittagong", "Dhaka", "Khulna"],
    "Barbados": ["Christ Church", "Saint Andrew", "Saint George", "Saint James"],
    "Belarus": ["Brest Region", "Gomel Region", "Grodno Region", "Minsk Region"],
    "Belgium": ["Antwerp", "East Flanders", "Flemish Brabant", "Hainaut"],
    "Belize": ["Belize District", "Cayo District", "Corozal District", "Orange Walk District"],
    "Benin": ["Alibori", "Atakora", "Atlantique", "Borgou"],
    "Bhutan": ["Bumthang District", "Chukha District", "Dagana District", "Gasa District"],
    "Bolivia": ["Beni", "Chuquisaca", "Cochabamba", "La Paz"],
    "BosniaandHerzegovina": ["Brcko District", "Federation of Bosnia and Herzegovina", "Republika Srpska"],
    "Botswana": ["Central District", "Chobe District", "Eastern Cape", "Ghanzi District"],
    "Brazil": ["Acre", "Alagoas", "Amapa", "Amazonas"],
    "Brunei": ["Belait District", "BruneiMuara District", "Temburong District", "Tutong District"],
    "Bulgaria": ["Blagoevgrad Province", "Burgas Province", "Dobrich Province", "Gabrovo Province"],
    "BurkinaFaso": ["Boucle du Mouhoun Region", "Cascades Region", "CentreEst Region", "CentreNord Region"],
    "Burundi": ["Bubanza Province", "Bujumbura Mairie Province", "Bujumbura Province", "Bururi Province"],
    "Cambodia": ["Banteay Meanchey Province", "Battambang Province", "Kampong Cham Province", "Kampong Chhnang Province"],
    "Cameroon": ["Adamawa Region", "Centre Region", "East Region", "Far North Region"],
    "CapeVerde": ["Boa Vista", "Brava", "Fogo", "Maio"],
    "CentralAfricanRepublic": ["BaminguiBangoran", "Bangui", "BasseKotto", "HauteKotto"],
    "Chad": ["Batha Region", "Borkou Region", "ChariBaguirmi Region", "Ennedi Region"],
    "Chile": ["Antofagasta", "Araucania", "Arica y Parinacota", "Atacama"],
    "Colombia": ["Amazonas", "Antioquia", "Arauca", "Atlantico"],
    "Comoros": ["Anjouan", "Grande Comore", "Moheli"],
    "CongoDemocraticRepublicofthe": ["BasUele", "Equateur", "HautKatanga", "HautLomami"],
    "CongotheRepublicofthe": ["Bouenza Department", "Brazzaville Department", "Cuvette Department", "CuvetteOuest Department"],
    "CostaRica": ["Alajuela Province", "Cartago Province", "Guanacaste Province", "Heredia Province"],
    "Croatia": ["BjelovarBilogora County", "BrodPosavina County", "DubrovnikNeretva County", "Istria County"],
    "Cuba": ["Artemisa", "Camaguey", "Ciego de Avila", "Cienfuegos"],
    "Cyprus": ["Famagusta District", "Kyrenia District", "Larnaca District", "Limassol District"],
    "CzechRepublic": ["Central Bohemian Region", "Hradec Kralove Region", "Karlovy Vary Region", "Liberec Region"],
    "Denmark": ["Capital Region of Denmark", "Central Denmark Region", "North Denmark Region", "Region Zealand"],
    "Djibouti": ["Arta Region", "Dikhil Region", "Djibouti Region", "Obock Region"],
    "Dominica": ["Saint Andrew Parish", "Saint David Parish", "Saint George Parish", "Saint John Parish"],
    "DominicanRepublic": ["Azua Province", "Baoruco Province", "Barahona Province", "Dajabon Province"],
    "Ecuador": ["Azuay", "Bolivar", "Canar", "Carchi"],
    "Egypt": ["Alexandria Governorate", "Aswan Governorate", "Asyut Governorate", "Beheira Governorate"],
    "ElSalvador": ["Ahuachapan Department", "Cabanas Department", "Chalatenango Department", "Cuscatlan Department"],
    "EquatorialGuinea": ["Annobon Province", "Bioko Norte Province", "Bioko Sur Province", "Centro Sur Province"],
    "Eritrea": ["Anseba Region", "Debub Region", "GashBarka Region", "Maekel Region"],
    "Estonia": ["Harju County", "Hiiu County", "IdaViru County", "Jogeva County"],
    "Eswatini": ["Hhohho District", "Lubombo District", "Manzini District", "Shiselweni District"],
    "Ethiopia": ["Addis Ababa", "Afar Region", "Amhara Region", "BenishangulGumuz Region"],
    "Fiji": ["Central Division", "Eastern Division", "Northern Division", "Western Division"],
    "Finland": ["Aland Islands", "Central Finland", "Central Ostrobothnia", "Eastern Finland"],
    "Gabon": ["Estuaire Province", "HautOgooue Province", "MoyenOgooue Province", "Ngounie Province"],
    "Gambia": ["Banjul", "Central River Division", "Lower River Division", "North Bank Division"],
    "Georgia": ["Adjara", "Guria", "Imereti", "Kakheti"],
    "Ghana": ["Ahafo Region", "Ashanti Region", "Bono East Region", "Bono Region"],
    "Greece": ["Attica", "Central Greece", "Central Macedonia", "Crete"],
    "Grenada": ["Saint Andrew Parish", "Saint David Parish", "Saint George Parish", "Saint John Parish"],
    "Guatemala": ["Alta Verapaz Department", "Baja Verapaz Department", "Chimaltenango Department", "Chiquimula Department"],
    "Guinea": ["Boke Region", "Conakry Region", "Faranah Region", "Kankan Region"],
    "GuineaBissau": ["Bafata Region", "Biombo Region", "Bissau Autonomous Sector", "Bolama Region"],
    "Guyana": ["BarimaWaini", "CuyuniMazaruni", "DemeraraMahaica", "East BerbiceCorentyne"],
    "Haiti": ["Artibonite", "Centre", "GrandAnse", "Nippes"],
    "Honduras": ["Atlantida Department", "Choluteca Department", "Colon Department", "Comayagua Department"],
    "Hungary": ["BacsKiskun County", "Baranya County", "Bekes County", "BorsodAbaujZemplen County"],
    "Iceland": ["Capital Region", "Southern Peninsula Region", "Western Region", "Westfjords"],
    "Indonesia": ["Aceh", "Bali", "Bangka Belitung Islands", "Banten"],
    "Iran": ["Alborz Province", "Ardabil Province", "Bushehr Province", "Chaharmahal and Bakhtiari Province"],
    "Iraq": ["Al Anbar Governorate", "Al Basrah Governorate", "Al Muthanna Governorate", "Al Qadisiyah Governorate"],
    "Ireland": ["Carlow", "Cavan", "Clare", "Cork"],
    "Israel": ["Central District", "Haifa District", "Jerusalem District", "Northern District"],
    "IvoryCoast": ["Abidjan Autonomous District", "BasSassandra District", "Comoé District", "Denguele District"],
    "Jamaica": ["Clarendon Parish", "Hanover Parish", "Kingston Parish", "Manchester Parish"],
    "Jordan": ["Ajloun Governorate", "Amman Governorate", "Aqaba Governorate", "Balqa Governorate"],
    "Kazakhstan": ["Akmola Region", "Aktobe Region", "Almaty", "Almaty Region"],
    "Kenya": ["Baringo County", "Bomet County", "Bungoma County", "Busia County"],
    "Kiribati": ["Gilbert Islands", "Line Islands", "Phoenix Islands"],
    "KoreaNorth": ["Chagang Province", "Kangwon Province", "North Hamgyong Province", "North Hwanghae Province"],
    "KoreaSouth": ["Busan", "Chungcheongbukdo", "Chungcheongnamdo", "Daegu"],
    "Kosovo": ["Ferizaj District", "Gjakova District", "Gjilan District", "Mitrovica District"],
    "Kuwait": ["Al Ahmadi Governorate", "Al Asimah Governorate", "Al Farwaniyah Governorate", "Al Jahra Governorate"],
    "Kyrgyzstan": ["Batken Region", "Bishkek", "Chuy Region", "IssykKul Region"],
    "Laos": ["Attapeu Province", "Bokeo Province", "Bolikhamsai Province", "Champasak Province"],
    "Latvia": ["Aizkraukle Municipality", "Aluksne Municipality", "Balvi Municipality", "Bauska Municipality"],
    "Lebanon": ["Akkar Governorate", "BaalbekHermel Governorate", "Beirut Governorate", "Beqaa Governorate"],
    "Lesotho": ["Berea District", "ButhaButhe District", "Leribe District", "Mafeteng District"],
    "Liberia": ["Bomi County", "Bong County", "Gbarpolu County", "Grand Bassa County"],
    "Libya": ["Benghazi District", "Derna District", "Ghat District", "Jabal al Akhdar District"],
    "Liechtenstein": ["Balzers", "Eschen", "Gamprin", "Mauren"],
    "Lithuania": ["Akmene District Municipality", "Alytus City Municipality", "Alytus District Municipality", "Birštonas Municipality"],
    "Luxembourg": ["Capellen Canton", "Clervaux Canton", "Diekirch Canton", "Echternach Canton"],
    "Madagascar": ["Antananarivo Province", "Antsiranana Province", "Fianarantsoa Province", "Mahajanga Province"],
    "Malawi": ["Balaka District", "Blantyre District", "Chikwawa District", "Chiradzulu District"],
    "Malaysia": ["Johor", "Kedah", "Kelantan", "Kuala Lumpur"],
    "Maldives": ["Alif Alif Atoll", "Alif Dhaal Atoll", "Baa Atoll", "Dhaalu Atoll"],
    "Mali": ["Bamako Capital District", "Gao Region", "Kayes Region", "Kidal Region"],
    "Malta": ["Birgu", "Bormla", "Fgura", "Floriana"],
    "MarshallIslands": ["Ailinglaplap Atoll", "Ailuk Atoll", "Arno Atoll", "Aur Atoll"],
    "Mauritania": ["Adrar Region", "Assaba Region", "Brakna Region", "Dakhlet Nouadhibou Region"],
    "Mauritius": ["Agaleega Islands", "Black River District", "Cargados Carajos Shoals", "Flacq District"],
    "Mexico": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche"],
    "Micronesia": ["Chuuk State", "Kosrae State", "Pohnpei State", "Yap State"],
    "Moldova": ["Anenii Noi District", "Balti Municipality", "Basarabeasca District", "Bender Municipality"],
    "Monaco": ["La Condamine", "MonacoVille", "Monte Carlo", "Fontvieille"],
    "Mongolia": ["Arkhangai Province", "Bayankhongor Province", "BayanOlgii Province", "Bulgan Province"],
    "Montenegro": ["Andrijevica Municipality", "Bar Municipality", "Berane Municipality", "Bijelo Polje Municipality"],
    "Morocco": ["AgadirIdaOuTanane Prefecture", "Al Haouz Province", "Al Hoceima Province", "Aousserd Province"],
    "Mozambique": ["Cabo Delgado Province", "Gaza Province", "Inhambane Province", "Manica Province"],
    "Myanmar": ["Ayeyarwady Region", "Bago Region", "Chin State", "Kachin State"],
    "Namibia": ["Erongo Region", "Hardap Region", "Karas Region", "Kavango East Region"],
    "Nauru": ["Aiwo Constituency", "Anabar Constituency", "Anetan Constituency", "Anibare Constituency"],
    "Nepal": ["Bagmati Province", "Gandaki Province", "Karnali Province", "Koshi Province"],
    "Netherlands": ["Drenthe", "Flevoland", "Friesland", "Gelderland"],
    "NewZealand": ["Auckland Region", "Bay of Plenty Region", "Canterbury Region", "Gisborne District"],
    "Nicaragua": ["Boaco Department", "Carazo Department", "Chinandega Department", "Chontales Department"],
    "Niger": ["Agadez Region", "Diffa Region", "Dosso Region", "Maradi Region"],
    "Nigeria": ["Abia State", "Adamawa State", "Akwa Ibom State", "Anambra State"],
    "NorthMacedonia": ["Aerodrom Municipality", "Aracinovo Municipality", "Berovo Municipality", "Bitola Municipality"],
    "Norway": ["Agder", "Innlandet", "MoreogRomsdal", "Nordland"],
    "Oman": ["Ad Dakhiliyah Governorate", "Ad Dhahirah Governorate", "Al Batinah North Governorate", "Al Batinah South Governorate"],
    "Pakistan": ["Azad Kashmir", "Balochistan", "GilgitBaltistan", "Islamabad Capital Territory"],
    "Palau": ["Aimeliik", "Airai", "Angaur", "Hatohobei"],
    "Panama": ["Bocas del Toro Province", "Chiriqui Province", "Cocle Province", "Colon Province"],
    "PapuaNewGuinea": ["Bougainville", "Central Province", "Chimbu Province", "Eastern Highlands Province"],
    "Paraguay": ["Alto Paraguay Department", "Alto Parana Department", "Amambay Department", "Boqueron Department"],
    "Peru": ["Amazonas", "Ancash", "Apurimac", "Arequipa"],
    "Philippines": ["Abra", "Agusan del Norte", "Agusan del Sur", "Aklan"],
    "Poland": ["Greater Poland Voivodeship", "KuyavianPomeranian Voivodeship", "Lesser Poland Voivodeship", "Lodz Voivodeship"],
    "Portugal": ["Acores", "Aveiro", "Beja", "Braga"],
    "Qatar": ["Al Daayen Municipality", "Al Khor Municipality", "Al Rayyan Municipality", "Al Shamal Municipality"],
    "Romania": ["Alba County", "Arad County", "Arges County", "Bacau County"],
    "Russia": ["Adygea Republic", "Altai Krai", "Altai Republic", "Amur Oblast"],
    "Rwanda": ["Eastern Province", "Kigali province", "Northern Province", "Southern Province"],
    "SaintKittsandNevis": ["Christ Church Nichola Town Parish", "Saint Anne Sandy Point Parish", "Saint George Basseterre Parish", "Saint James Windward Parish"],
    "SaintLucia": ["Anse la Raye Quarter", "Canaries Quarter", "Castries Quarter", "Choiseul Quarter"],
    "SaintVincentandtheGrenadines": ["Charlotte Parish", "Grenadines Parish", "Saint Andrew Parish", "Saint David Parish"],
    "Samoa": ["Aana", "AigailetoTai", "Atua", "Faasaleleaga"],
    "SanMarino": ["Acquaviva", "Borgo Maggiore", "Chiesanuova", "Domagnano"],
    "SaoTomeandPrincipe": ["Agua Grande District", "Cantagalo District", "Caue District", "Lemba District"],
    "SaudiArabia": ["Asir Region", "Al Bahah Region", "Al Jawf Region", "Al Madinah Region"],
    "Senegal": ["Dakar", "Diourbel", "Fatick", "Kaffrine"],
    "Serbia": ["Belgrade", "Bor District", "Branicevo District", "Central Banat District"],
    "Seychelles": ["Anse aux Pins", "Anse Boileau", "Anse Etoile", "Au Cap"],
    "SierraLeone": ["Eastern Province", "Northern Province", "North West Province", "Southern Province"],
    "Singapore": ["Central Singapore Community Development Council", "North East Community Development Council", "North West Community Development Council", "South East Community Development Council"],
    "Slovakia": ["Banska Bystrica Region", "Bratislava Region", "Kosice Region", "Nitra Region"],
    "Slovenia": ["Ajdovscina Municipality", "Ankaran Municipality", "Apace Municipality", "Beltinci Municipality"],
    "SolomonIslands": ["Central Province", "Choiseul Province", "Guadalcanal Province", "Honiara"],
    "Somalia": ["Awdal", "Bakool", "Banadir", "Bari"],
    "SouthAfrica": ["Eastern Cape", "Free State", "Gauteng", "KwaZuluNatal"],
    "SouthSudan": ["Central Equatoria", "Eastern Equatoria", "Jonglei", "Lakes"],
    "Spain": ["Andalusia", "Aragon", "Asturias", "Balearic Islands"],
    "SriLanka": ["Central Province", "Eastern Province", "North Central Province", "North Western Province"],
    "Sudan": ["Central Darfur", "East Darfur", "East Jebel State", "Gezira"],
    "Suriname": ["Brokopondo District", "Commewijne District", "Coronie District", "Marowijne District"],
    "Sweden": ["Blekinge County", "Dalarna County", "Gavleborg County", "Gotland County"],
    "Switzerland": ["Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "BaselLandschaft"],
    "Syria": ["AlHasakah Governorate", "AlRaqqah Governorate", "Aleppo Governorate", "AsSuwayda Governorate"],
    "Taiwan": ["Changhua County", "Chiayi City", "Chiayi County", "Hsinchu City"],
    "Tajikistan": ["Dushanbe", "GornoBadakhshan Autonomous Region", "Khatlon Province", "Sughd Province"],
    "Tanzania": ["Arusha Region", "Dar es Salaam Region", "Dodoma Region", "Geita Region"],
    "Thailand": ["Amnat Charoen", "Ang Thong", "Bangkok", "Bueng Kan"],
    "TimorLeste": ["Aileu Municipality", "Ainaro Municipality", "Baucau Municipality", "Bobonaro Municipality"],
    "Togo": ["Centrale Region", "Kara Region", "Maritime", "Plateaux Region"],
    "Tonga": ["Eua", "Haapai", "Niuas", "Tongatapu"],
    "TrinidadandTobago": ["Arima", "Chaguanas", "CouvaTabaquiteTalparo", "Diego Martin Region"],
    "Tunisia": ["Ariana Governorate", "Beja Governorate", "Ben Arous Governorate", "Bizerte Governorate"],
    "Turkey": ["Adana", "Adiyaman", "Afyonkarahisar", "Agri"]
  
};

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    country: "",
    state: "",
    address: "",
    pincode: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enable button only if all fields are filled
  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2 className="signup-title">CREATE ACCOUNT</h2>
        
        {submitted ? (
          <div className="success-message">✅ You have successfully signed up!</div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="signup-label">Full Name</label>
              <input type="text" name="fullName" className="signup-input" placeholder="Enter your full name" onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="signup-label">Mobile Number</label>
              <input type="text" name="mobile" className="signup-input" placeholder="Enter your mobile number" onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="signup-label">Email</label>
              <input type="email" name="email" className="signup-input" placeholder="Enter your email" onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="signup-label">Password</label>
              <input type="password" name="password" className="signup-input" placeholder="Enter your password" onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="signup-label">Country</label>
              <select name="country" className="signup-dropdown" onChange={handleChange}>
                <option value="">Select Country</option>
                {Object.keys(countries).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="signup-label">State</label>
              <select name="state" className="signup-dropdown" onChange={handleChange} disabled={!formData.country}>
                <option value="">Select State</option>
                {formData.country &&
                  countries[formData.country].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
            </div>

            <div className="input-group full-width">
              <label className="signup-label">Address</label>
              <input type="text" name="address" className="signup-input" placeholder="Enter your address" onChange={handleChange} />
            </div>

            <div className="input-group full-width">
              <label className="signup-label">Pin Code</label>
              <input type="text" name="pincode" className="signup-input" placeholder="Enter your pin code" onChange={handleChange} />
            </div>

            <button type="submit" className="signup-button" disabled={!isFormValid}>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
