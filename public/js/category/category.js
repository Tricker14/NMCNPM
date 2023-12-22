document.addEventListener("DOMContentLoaded", function(){

    function createCategoryElement(category) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-2', 'd-flex', 'flex-column', 'align-items-center', 'category-button'); // Added 'category-button' class

        const avatarFrame = document.createElement('div');
        avatarFrame.classList.add('avatar-frame');

        
        const link = document.createElement('a');
        link.href = `/webid/categories/${category._id}`; 

        const image = document.createElement('img');
        console.log('image ', category.image);
        image.src = `/images/categories-images/${category.image}`;
        image.alt = '';

        link.appendChild(image);

        const nameCategory = document.createElement('div');
        nameCategory.classList.add('nameCategory');
        nameCategory.innerHTML = `<p><strong style="font-size: 2rem;">${category.name}</strong></p>`;

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

        if(user && user.role === 'admin'){
            const addButton = createAddButton();
            container.appendChild(addButton);
        }
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