 const cities = [
    "Gopalganj, Bihar",
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
    "Kolkata, West Bengal",
    "Chennai, Tamil Nadu",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Ahmedabad, Gujarat",
    "Pune, Maharashtra",
    "Surat, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra",
    "Visakhapatnam, Andhra Pradesh",
    "Indore, Madhya Pradesh",
    "Thane, Maharashtra",
    "Bhopal, Madhya Pradesh",
    "Patna, Bihar",
    "Vadodara, Gujarat",
    "Ghaziabad, Uttar Pradesh",
    "Ludhiana, Punjab",
    "Agra, Uttar Pradesh",
    "Nashik, Maharashtra",
    "Faridabad, Haryana",
    "Meerut, Uttar Pradesh",
    "Rajkot, Gujarat",
    "Kalyan-Dombivli, Maharashtra",
    "Vasai-Virar, Maharashtra",
    "Varanasi, Uttar Pradesh",
    "Srinagar, Jammu and Kashmir",
    "Aurangabad, Maharashtra",
    "Dhanbad, Jharkhand",
    "Amritsar, Punjab",
    "Navi Mumbai, Maharashtra",
    "Allahabad, Uttar Pradesh",
    "Ranchi, Jharkhand",
    "Howrah, West Bengal",
    "Jabalpur, Madhya Pradesh",
    "Gwalior, Madhya Pradesh",
    "Vijayawada, Andhra Pradesh",
    "Jodhpur, Rajasthan",
    "Madurai, Tamil Nadu",
    "Raipur, Chhattisgarh",
    "Kota, Rajasthan",
    "Chandigarh, Chandigarh",
    "Guwahati, Assam",
    "Solapur, Maharashtra",
    "Hubli-Dharwad, Karnataka",
    "Tiruchirappalli, Tamil Nadu",
    "Bareilly, Uttar Pradesh",
    "Moradabad, Uttar Pradesh",
    "Mysore, Karnataka",
    "Tiruppur, Tamil Nadu",
    "Gurgaon, Haryana",
    "Aligarh, Uttar Pradesh",
    "Jalandhar, Punjab",
    "Bhubaneswar, Odisha",
    "Salem, Tamil Nadu",
    "Warangal, Telangana",
    "Guntur, Andhra Pradesh",
    "Bhiwandi, Maharashtra",
    "Saharanpur, Uttar Pradesh",
    "Gorakhpur, Uttar Pradesh",
    "Bikaner, Rajasthan",
    "Amravati, Maharashtra",
    "Noida, Uttar Pradesh",
    "Jamshedpur, Jharkhand",
    "Bhilai, Chhattisgarh",
    "Cuttack, Odisha",
    "Firozabad, Uttar Pradesh",
    "Kochi, Kerala",
    "Nellore, Andhra Pradesh",
    "Bhavnagar, Gujarat",
    "Dehradun, Uttarakhand",
    "Durgapur, West Bengal",
    "Asansol, West Bengal",
    "Rourkela, Odisha",
    "Nanded, Maharashtra",
    "Kolhapur, Maharashtra",
    "Ajmer, Rajasthan",
    "Akola, Maharashtra",
    "Gulbarga, Karnataka",
    "Jamnagar, Gujarat",
    "Ujjain, Madhya Pradesh",
    "Loni, Uttar Pradesh",
    "Siliguri, West Bengal",
    "Jhansi, Uttar Pradesh",
    "Ulhasnagar, Maharashtra",
    "Jammu, Jammu and Kashmir",
    "Sangli-Miraj & Kupwad, Maharashtra",
    "Mangalore, Karnataka",
    "Erode, Tamil Nadu",
    "Belgaum, Karnataka",
    "Ambattur, Tamil Nadu",
    "Tirunelveli, Tamil Nadu",
    "Malegaon, Maharashtra",
    "Gaya, Bihar",
    "Jalgaon, Maharashtra",
    "Udaipur, Rajasthan",
    "Maheshtala, West Bengal",
    "Davanagere, Karnataka",
    "Kozhikode, Kerala",
    "Kurnool, Andhra Pradesh",
    "Rajpur Sonarpur, West Bengal",
    "Rajahmundry, Andhra Pradesh",
    "Bokaro, Jharkhand",
    "South Dumdum, West Bengal",
    "Bellary, Karnataka",
    "Patiala, Punjab",
    "Gopalpur, West Bengal",
    "Agartala, Tripura",
    "Bhagalpur, Bihar",
    "Muzaffarnagar, Uttar Pradesh",
    "Bhatpara, West Bengal",
    "Panihati, West Bengal",
    "Latur, Maharashtra",
    "Dhule, Maharashtra",
    "Rohtak, Haryana",
    "Sambalpur, Odisha",
    "Korba, Chhattisgarh",
    "Bhilwara, Rajasthan",
    "Brahmapur, Odisha",
    "Muzaffarpur, Bihar",
    "Ahmednagar, Maharashtra",
    "Mathura, Uttar Pradesh",
    "Kollam, Kerala",
    "Avadi, Tamil Nadu",
    "Kadapa, Andhra Pradesh",
    "Kamarhati, West Bengal",
    "Sambhal, Uttar Pradesh",
    "Bilaspur, Chhattisgarh",
    "Shahjahanpur, Uttar Pradesh",
    "Satara, Maharashtra",
    "Bijapur, Karnataka",
    "Rampur, Uttar Pradesh",
    "Shivamogga, Karnataka",
    "Chandrapur, Maharashtra",
    "Junagadh, Gujarat",
    "Thrissur, Kerala",
    "Alwar, Rajasthan",
    "Bardhaman, West Bengal",
    "Kulti, West Bengal",
    "Nizamabad, Telangana",
    "Parbhani, Maharashtra",
    "Tumkur, Karnataka",
    "Khammam, Telangana",
    "Ozhukarai, Puducherry",
    "Bihar Sharif, Bihar",
    "Panipat, Haryana",
    "Darbhanga, Bihar",
    "Bally, West Bengal",
    "Aizawl, Mizoram",
    "Dewas, Madhya Pradesh",
    "Ichalkaranji, Maharashtra",
    "Tirupati, Andhra Pradesh",
    "Karnal, Haryana",
    "Bathinda, Punjab",
    "Jalna, Maharashtra",
    "Eluru, Andhra Pradesh",
    "Barasat, West Bengal",
    "Kirari Suleman Nagar, Delhi",
    "Purnia, Bihar",
    "Satna, Madhya Pradesh",
    "Mau, Uttar Pradesh",
    "Sonipat, Haryana",
    "Farrukhabad, Uttar Pradesh",
    "Sagar, Madhya Pradesh",
    "Rourkela, Odisha",
    "Durg, Chhattisgarh",
    "Imphal, Manipur",
    "Ratlam, Madhya Pradesh",
    "Hapur, Uttar Pradesh",
    "Arrah, Bihar",
    "Anantapur, Andhra Pradesh",
    "Karimnagar, Telangana",
    "Etawah, Uttar Pradesh",
    "Ambernath, Maharashtra",
    "North Dumdum, West Bengal",
    "Bharatpur, Rajasthan",
    "Begusarai, Bihar",
    "New Delhi, Delhi"
]

export default cities;