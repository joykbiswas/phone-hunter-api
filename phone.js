const loadPhone = async (searchText='13',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    
    phoneContainer.textContent ='';

    const showAllContainer = document.getElementById('show-all-btn')

    if(phones.length > 12 && !isShowAll ){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    
    // console.log('is Show All',isShowAll);
    if(!isShowAll){
        phones = phones.splice(0,12);
    }

    //display only show only 12 device
    

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-base-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image
        }" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug
            }') " class="btn btn-primary">Show Details</button>
          </div>
        </div>`;
        phoneContainer.appendChild(phoneCard)
    });
    // heading loading spinner
    toggleLoadingSpinner(false);
}

// show details btn click show data
const handleShowDetails= async (id) =>{
    // console.log('handle show details',id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    // console.log(data);
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    //  console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML=`
        <img src="${phone.image}" alt="" />
        <p><span class="text-xl">Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span class="text-xl">ChipSet:</span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="text-xl">Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p><span class="text-xl">DisplaySize:</span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="text-xl">Slug:</span>${phone?.mainFeatures?.slug || 'no available Slug'}</p>
        <p><span class="text-xl">releaseDate:</span>${phone?.mainFeatures?.releaseDate || 'not available release data'}</p>
        <p><span class="text-xl">GPS:</span>${phone.others?.GPS || 'no GPS available'}</p>
        <p><span class="text-xl">GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'no GPS available in this device'}</p>
        
    `
    
    //show the modal
    my_details_modal.showModal()
}


//handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll)
}

const toggleLoadingSpinner = (isLoading) =>{
    const LoadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        LoadingSpinner.classList.remove('hidden');
    }else{
        LoadingSpinner.classList.add('hidden')
    }
}

//handle shoe all
const handleShowAll = () =>{
    handleSearch(true)
}


loadPhone();