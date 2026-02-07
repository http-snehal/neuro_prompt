// Professional Yeti Login Animation
// Powered by GSAP - integrates with Neuroprompt popup

const YETI_SVG = `<svg class="mySVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
    <defs>
        <circle id="armMaskPath" cx="100" cy="100" r="100"/>
    </defs>
    <clipPath id="armMask">
        <use xlink:href="#armMaskPath" overflow="visible"/>
    </clipPath>
    <circle cx="100" cy="100" r="100" fill="#a9ddf3"/>
    <g class="body">
        <path class="bodyBGchanged" style="display: none;" fill="#FFFFFF" d="M200,122h-35h-14.9V72c0-27.6-22.4-50-50-50s-50,22.4-50,50v50H35.8H0l0,91h200L200,122z"/>
        <path class="bodyBGnormal" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF" d="M200,158.5c0-20.2-14.8-36.5-35-36.5h-14.9V72.8c0-27.4-21.7-50.4-49.1-50.8c-28-0.5-50.9,22.1-50.9,50v50 H35.8C16,122,0,138,0,157.8L0,213h200L200,158.5z"/>
        <path fill="#DDF1FA" d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z"/>
    </g>
    <g class="earL">
        <g class="outerEar" fill="#ddf1fa" stroke="#3a5e77" stroke-width="2.5">
            <circle cx="47" cy="83" r="11.5"/>
            <path d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g class="earHair">
            <rect x="51" y="64" fill="#FFFFFF" width="15" height="35"/>
            <path d="M53.4 62.8C48.5 67.4 45 72.2 42.8 77c3.4-.1 6.8-.1 10.1.1-4 3.7-6.8 7.6-8.2 11.6 2.1 0 4.2 0 6.3.2-2.6 4.1-3.8 8.3-3.7 12.5 1.2-.7 3.4-1.4 5.2-1.9" fill="#fff" stroke="#3a5e77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </g>
    <g class="earR">
        <g class="outerEar">
            <circle fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" cx="153" cy="83" r="11.5"/>
            <path fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M153.7,78.9 c2.3,0,4.1,1.9,4.1,4.1c0,2.3-1.9,4.1-4.1,4.1"/>
        </g>
        <g class="earHair">
            <rect x="134" y="64" fill="#FFFFFF" width="15" height="35"/>
            <path fill="#FFFFFF" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M146.6,62.8 c4.9,4.6,8.4,9.4,10.6,14.2c-3.4-0.1-6.8-0.1-10.1,0.1c4,3.7,6.8,7.6,8.2,11.6c-2.1,0-4.2,0-6.3,0.2c2.6,4.1,3.8,8.3,3.7,12.5 c-1.2-0.7-3.4-1.4-5.2-1.9"/>
        </g>
    </g>
    <path class="chin" d="M84.1 121.6c2.7 2.9 6.1 5.4 9.8 7.5l.9-4.5c2.9 2.5 6.3 4.8 10.2 6.5 0-1.9-.1-3.9-.2-5.8 3 1.2 6.2 2 9.7 2.5-.3-2.1-.7-4.1-1.2-6.1" fill="none" stroke="#3a5e77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="face" fill="#DDF1FA" d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46"/>
    <path class="hair" fill="#FFFFFF" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M81.457,27.929 c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235 c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474"/>
    <g class="eyebrow">
        <path fill="#FFFFFF" d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037 c-4.569-1.465-8.909-3.222-12.996-5.226c-0.98,3.075-2.07,6.137-3.267,9.179c-5.514-3.067-10.559-6.545-15.097-10.329 c-1.806,2.889-3.745,5.73-5.816,8.515c-7.916-4.124-15.053-9.114-21.296-14.738l1.107-11.768h73.475V55.064z"/>
        <path fill="#FFFFFF" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M63.56,55.102 c6.243,5.624,13.38,10.614,21.296,14.738c2.071-2.785,4.01-5.626,5.816-8.515c4.537,3.785,9.583,7.263,15.097,10.329 c1.197-3.043,2.287-6.104,3.267-9.179c4.087,2.004,8.427,3.761,12.996,5.226c0.545-3.348,0.986-6.696,1.322-10.037 c4.913-0.481,9.857-1.34,14.787-2.599"/>
    </g>
    <g class="eyeL">
        <circle cx="85.5" cy="78.5" r="3.5" fill="#3a5e77"/>
        <circle cx="84" cy="76" r="1" fill="#fff"/>
    </g>
    <g class="eyeR">
        <circle cx="114.5" cy="78.5" r="3.5" fill="#3a5e77"/>
        <circle cx="113" cy="76" r="1" fill="#fff"/>
    </g>
    <g class="mouth">
        <path class="mouthBG" fill="#617E92" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
        <path style="display: none;" class="mouthSmallBG" fill="#617E92" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
        <path style="display: none;" class="mouthMediumBG" d="M95,104.2c-4.5,0-8.2-3.7-8.2-8.2v-2c0-1.2,1-2.2,2.2-2.2h22c1.2,0,2.2,1,2.2,2.2v2 c0,4.5-3.7,8.2-8.2,8.2H95z"/>
        <path style="display:none;" class="mouthLargeBG" d="M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" fill="#617e92" stroke="#3a5e77" stroke-linejoin="round" stroke-width="2.5"/>
        <defs>
            <path id="mouthMaskPath" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
        </defs>
        <clipPath id="mouthMask">
            <use xlink:href="#mouthMaskPath" overflow="visible"/>
        </clipPath>
        <g clip-path="url(#mouthMask)">
            <g class="tongue">
                <circle cx="100" cy="107" r="8" fill="#cc4a6c"/>
                <ellipse class="tongueHighlight" cx="100" cy="100.5" rx="3" ry="1.5" opacity=".1" fill="#fff"/>
            </g>
        </g>
        <path clip-path="url(#mouthMask)" class="tooth" style="fill:#FFFFFF;" d="M106,97h-4c-1.1,0-2-0.9-2-2v-2h8v2C108,96.1,107.1,97,106,97z"/>
        <path class="mouthOutline" fill="none" stroke="#3A5E77" stroke-width="2.5" stroke-linejoin="round" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
    </g>
    <path class="nose" d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z" fill="#3a5e77"/>
    <g class="arms" clip-path="url(#armMask)">
        <g class="armL" style="visibility: hidden;">
            <polygon fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="121.3,98.4 111,59.7 149.8,49.3 169.8,85.4"/>
            <path fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M134.4,53.5l19.3-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-10.3,2.8"/>
            <path fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M150.9,59.4l26-7c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-21.3,5.7"/>
            <g class="twoFingers">
                <path fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M158.3,67.8l23.1-6.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-23.1,6.2"/>
                <path fill="#A9DDF3" d="M180.1,65l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L180.1,65z"/>
                <path fill="#DDF1FA" stroke="#3A5E77" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M160.8,77.5l19.4-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-18.3,4.9"/>
                <path fill="#A9DDF3" d="M178.8,75.7l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L178.8,75.7z"/>
            </g>
            <path fill="#A9DDF3" d="M175.5,55.9l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L175.5,55.9z"/>
            <path fill="#A9DDF3" d="M152.1,50.4l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L152.1,50.4z"/>
        </g>
        <g class="armR" style="visibility: hidden;">
            <path fill="#ddf1fa" stroke="#3a5e77" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5" d="M265.4 97.3l10.4-38.6-38.9-10.5-20 36.1z"/>
            <path fill="#ddf1fa" stroke="#3a5e77" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5" d="M252.4 52.4L233 47.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l10.3 2.8M226 76.4l-19.4-5.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l18.3 4.9M228.4 66.7l-23.1-6.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l23.1 6.2M235.8 58.3l-26-7c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l21.3 5.7"/>
            <path fill="#a9ddf3" d="M207.9 74.7l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM206.7 64l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM211.2 54.8l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM234.6 49.4l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8z"/>
        </g>
    </g>
</svg>`;

// Initialize Yeti animation when DOM is ready
function initYetiAnimation() {
    // Wait for GSAP to load
    if (typeof gsap === 'undefined') {
        console.log('⏳ Waiting for GSAP to load...');
        setTimeout(initYetiAnimation, 100);
        return;
    }

    console.log('🎨 Initializing Professional Yeti Animation');

    // Replace simple Yeti with professional one
    const yetiWrapper = document.querySelector('.yeti-wrapper');
    if (yetiWrapper) {
        yetiWrapper.classList.add('svgContainer');
        yetiWrapper.innerHTML = `<div>${YETI_SVG}</div>`;
    }

    // Get references to all SVG elements
    const mySVG = document.querySelector('.svgContainer');
    const armL = document.querySelector('.armL');
    const armR = document.querySelector('.armR');
    const eyeL = document.querySelector('.eyeL');
    const eyeR = document.querySelector('.eyeR');
    const nose = document.querySelector('.nose');
    const mouth = document.querySelector('.mouth');
    const mouthBG = document.querySelector('.mouthBG');
    const mouthSmallBG = document.querySelector('.mouthSmallBG');
    const mouthMediumBG = document.querySelector('.mouthMediumBG');
    const mouthLargeBG = document.querySelector('.mouthLargeBG');
    const mouthMaskPath = document.querySelector('#mouthMaskPath');
    const mouthOutline = document.querySelector('.mouthOutline');
    const tooth = document.querySelector('.tooth');
    const tongue = document.querySelector('.tongue');
    const chin = document.querySelector('.chin');
    const face = document.querySelector('.face');
    const eyebrow = document.querySelector('.eyebrow');
    const outerEarL = document.querySelector('.earL .outerEar');
    const outerEarR = document.querySelector('.earR .outerEar');
    const earHairL = document.querySelector('.earL .earHair');
    const earHairR = document.querySelector('.earR .earHair');
    const hair = document.querySelector('.hair');
    const bodyBG = document.querySelector('.bodyBGnormal');
    const bodyBGchanged = document.querySelector('.bodyBGchanged');

    let mouthStatus = "small";
    let eyeScale = 1;
    let eyesCovered = false;
    let blinking = null;

    // Initialize arm positions
    gsap.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
    gsap.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });
    gsap.set(mouth, { transformOrigin: "center center" });

    // Start blinking
    function startBlinking(delay = 5) {
        blinking = gsap.to([eyeL, eyeR], 0.1, {
            delay: delay,
            scaleY: 0,
            yoyo: true,
            repeat: 1,
            transformOrigin: "center center",
            onComplete: () => startBlinking(Math.random() * 10 + 2)
        });
    }

    function stopBlinking() {
        if (blinking) {
            blinking.kill();
            gsap.set([eyeL, eyeR], { scaleY: eyeScale });
        }
    }

    // Cover eyes with arms
    function coverEyes() {
        gsap.killTweensOf([armL, armR]);
        gsap.set([armL, armR], { visibility: "visible" });
        gsap.to(armL, 0.45, { x: -93, y: 10, rotation: 0, ease: "quad.out" });
        gsap.to(armR, 0.45, { x: -93, y: 10, rotation: 0, ease: "quad.out", delay: 0.1 });
        eyesCovered = true;
        console.log('🙈 Yeti covering eyes');
    }

    function uncoverEyes() {
        gsap.killTweensOf([armL, armR]);
        gsap.to(armL, 1.35, { y: 220, ease: "quad.out" });
        gsap.to(armL, 1.35, { rotation: 105, ease: "quad.out", delay: 0.1 });
        gsap.to(armR, 1.35, { y: 220, ease: "quad.out" });
        gsap.to(armR, 1.35, {
            rotation: -105,
            ease: "quad.out",
            delay: 0.1,
            onComplete: () => gsap.set([armL, armR], { visibility: "hidden" })
        });
        eyesCovered = false;
        console.log('👀 Yeti uncovering eyes');
    }

    // Email input animations - ONLY eye tracking, no mouth opening
    function onEmailInput(e) {
        const value = e.target.value;
        console.log('📧 Email input - tracking eyes:', value);

        // Move eyes based on text length (simulate following the cursor)
        // Using smaller multiplier and max to keep eyes centered
        const maxMove = 5; // Maximum pixels to move (reduced from 15)
        const move = Math.min(value.length * 0.4, maxMove); // Reduced multiplier from 1.2 to 0.4

        gsap.to([eyeL, eyeR], 0.3, {
            x: move,
            ease: "power2.out"
        });

        console.log(`👀 Eyes moved: ${move}px`);
    }

    // Reset eyes to center
    function resetEyes() {
        gsap.to([eyeL, eyeR], 0.3, {
            x: 0,
            ease: "power2.out"
        });
        console.log('� Eyes reset to center');
    }

    // Show/hide password toggle with finger animation
    function spreadFingers() {
        const twoFingers = document.querySelector('.twoFingers');
        if (twoFingers) {
            console.log('✌️ Spreading fingers');
            gsap.to(twoFingers, 0.35, {
                transformOrigin: "bottom left",
                rotation: 30,
                x: -9,
                y: -2,
                ease: "power2.inOut"
            });
        }
    }

    function closeFingers() {
        const twoFingers = document.querySelector('.twoFingers');
        if (twoFingers) {
            console.log('👊 Closing fingers');
            gsap.to(twoFingers, 0.35, {
                transformOrigin: "bottom left",
                rotation: 0,
                x: 0,
                y: 0,
                ease: "power2.inOut"
            });
        }
    }

    // Attach to login form inputs
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');

    console.log('🔍 Looking for form elements...');
    console.log('Email element:', loginEmail);
    console.log('Password element:', loginPassword);

    if (loginEmail) {
        // Use both 'input' and 'keyup' events for better detection
        loginEmail.addEventListener('input', onEmailInput);
        loginEmail.addEventListener('keyup', onEmailInput);

        // Uncover eyes when focusing on email field
        loginEmail.addEventListener('focus', () => {
            console.log('📧 Email focused - uncovering eyes');
            uncoverEyes();
        });

        // Reset eye position when leaving email field
        loginEmail.addEventListener('blur', () => {
            console.log('📧 Email blurred - resetting eyes');
            resetEyes();
        });

        console.log('✅ Email input connected with eye tracking');

        // Test if it works
        setTimeout(() => {
            console.log('Testing email listener - type in the email field!');
        }, 500);
    } else {
        console.error('❌ Email input not found!');
    }

    if (loginPassword) {
        loginPassword.addEventListener('focus', () => {
            console.log('🔒 Password focused - covering eyes');
            coverEyes();
        });
        loginPassword.addEventListener('blur', () => {
            console.log('🔓 Password blurred - uncovering eyes');
            // Only uncover if password is not visible (checkbox unchecked)
            const showPasswordCheck = document.getElementById('showPasswordCheck');
            if (!showPasswordCheck || !showPasswordCheck.checked) {
                setTimeout(() => uncoverEyes(), 100);
            }
        });
        console.log('✅ Password input connected');
    } else {
        console.error('❌ Password input not found!');
    }

    // Show password toggle - ONLY spread fingers, DON'T uncover eyes
    const showPasswordCheck = document.getElementById('showPasswordCheck');
    if (showPasswordCheck && loginPassword) {
        showPasswordCheck.addEventListener('change', (e) => {
            if (e.target.checked) {
                loginPassword.type = 'text';
                spreadFingers();
                console.log('👁️ Password visible - fingers spread (peeking)');
            } else {
                loginPassword.type = 'password';
                closeFingers();
                console.log('🙈 Password hidden - fingers closed');
            }
        });

        // When clicking show, also focus password if eyes aren't covered yet
        showPasswordCheck.addEventListener('click', () => {
            if (!eyesCovered && loginPassword) {
                loginPassword.focus();
            }
        });

        console.log('✅ Show password toggle connected');
    }

    // Check if all SVG elements are found
    console.log('SVG Elements Check:', {
        armL: !!armL,
        armR: !!armR,
        eyeL: !!eyeL,
        eyeR: !!eyeR,
        mouth: !!mouth
    });

    // Start blinking
    startBlinking();
    console.log('✅ Yeti animation initialized!');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOM to load...');
    document.addEventListener('DOMContentLoaded', initYetiAnimation);
} else {
    console.log('✅ DOM already loaded, initializing immediately');
    // Wait a bit for popup.js to set up form elements
    setTimeout(initYetiAnimation, 100);
}
