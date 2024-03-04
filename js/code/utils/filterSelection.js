document.querySelectorAll('.category-button').forEach(function(button) {
    button.addEventListener('click', function() {
        // Remove the 'selected' class from all buttons
        document.querySelectorAll('.category-button').forEach(function(btn) {
            btn.classList.remove('selected');
        });
        // Add the 'selected' class to the clicked button
        button.classList.add('selected');
        
        // Retrieve the category associated with the clicked button
        const category = button.dataset.category;
        
        // Filter features based on the category
        filterFeaturesByCategory(category);
    });
});