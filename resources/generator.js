for (var i = 1; i <= 50000; i++) {
    var randomTags = ['2x1', 'oferta', 'precios cuidados', 'sello nutricional'].sort( function() { return 0.5 - Math.random() } ).slice(1, Math.floor(Math.random() * 5));
    var randomPrice = Math.ceil(1100+(Math.random() * 300 - 1000));
    db.products.insert({
        name:'Producto '+i,
        price:randomPrice,
        tags: randomTags
    });
}
for (var i = 1; i <= 50000; i++) {
    if (Math.random() > 0.7) {
        var randomPurchases = Math.ceil(Math.random() * 5);
        for (var r = 1; r <= randomPurchases; r++){
            var randomLong = -34.56 - (Math.random() * .23);
            var randomLat = -58.4 - (Math.random() * .22);
            var totalCost = 200+Math.ceil(Math.random()*20) * 100;
            db.purchases.insert({
                productName:'Producto '+i,
                totalCost: totalCost,
                location: {
                        type: "Point",
                        coordinates: [randomLat, randomLong]
                    }
            });
        }	
    }
}
    