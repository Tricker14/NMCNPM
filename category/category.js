document.addEventListener("DOMContentLoaded", function(){
    const categories = [
        { name: 'Accessories', image: './image/accessories.jpg' },
        { name: 'Potteries', image: './image/pottery.jpg' },
        { name: 'Paintings', image: './image/paintings.jpg' },
        { name: 'Jewelry', image: './image/jewelry.jpg' },
        { name: 'Toys', image: './image/toys.jpg' },
        { name: 'Games', image: './image/games.jpg' },
        { name: 'Electronics', image: './image/electronics.jpg' },
        { name: 'Interior', image: './image/interior.jpg' },
        { name: 'Clothing', image: './image/clothing.jpg' },
        { name: 'Antiques', image: './image/antiques.jpg' },
        { name: 'Party Supplies', image: './image/party.jpg' },
        { name: 'Housewares', image: './image/Houseware.jpg' },
        { name: 'School Supplies', image: './image/school supplies.jpg' },
        { name: 'Handmades', image: './image/handmade.jpg' },
    ];


    function createCategoryElement(category) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-2', 'd-flex', 'flex-column', 'align-items-center', 'category-button'); // Added 'category-button' class

        const avatarFrame = document.createElement('div');
        avatarFrame.classList.add('avatar-frame');

        
        const link = document.createElement('a');
        link.href = '#'; 

        const image = document.createElement('img');
        image.src = category.image;
        image.alt = '';

        link.appendChild(image);

        const nameCategory = document.createElement('div');
        nameCategory.classList.add('nameCategory');
        nameCategory.innerHTML = `<p><strong>${category.name}</strong></p>`;

        avatarFrame.appendChild(link); 
        colDiv.appendChild(avatarFrame);
        colDiv.appendChild(nameCategory);

        return colDiv;
    }


    function initCategories() {
        const container = document.getElementById('categoryContainer');

        categories.sort((a, b) => a.name.localeCompare(b.name));

        categories.forEach(category => {
            const categoryElement = createCategoryElement(category);
            container.appendChild(categoryElement);
        });

        
        const addButton = createAddButton();
        container.appendChild(addButton);
    }

    function createAddButton() {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-2', 'd-flex', 'flex-column', 'align-items-center');

        const addButtonContainer = document.createElement('div');
        addButtonContainer.classList.add('avatar-frame');

        const addButton = document.createElement('button');
        addButton.innerHTML = '<i class="bi bi-patch-plus" style="font-size: 3em;"></i>';
        addButton.classList.add('w-100', 'h-100');

        addButton.style.backgroundColor = '#ffe4c4';
        addButton.style.border = 'none';
        addButton.addEventListener('click', handleAddButtonClick);

        addButtonContainer.appendChild(addButton);
        colDiv.appendChild(addButtonContainer);

        return colDiv;
    }


    function handleAddButtonClick() {
        const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
        addCategoryModal.show();
    }

    initCategories();
});