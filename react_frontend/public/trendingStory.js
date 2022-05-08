function animation() {
    CSSPlugin.defaultTransformPerspective = 400;
    gsap.to(".trendingTitle", { duration: 3, repeat: -1, rotationX: 360 });

    gsap.to(".trendingCard", {
        duration: 30,
        ease: "none",
        x: "+=500", //move each box 500px to right
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % 500) //force x value to be between 0 and 500 using modulus
        },
        repeat: -1
    });
}
animation()