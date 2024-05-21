const axios = require('axios');
const fs = require('fs');

//sd_xl_base_1.0
const url = "http://127.0.0.1:7860";
payload = {
    "prompt": "A majestic lion jumping from a big stone at night",
    "negative_prompt": "low quality",
    "steps": 20,
    "cfg_scale": 11,
    "width": 512,
    "height": 512,
    "override_settings": {
        "sd_model_checkpoint": "sd_xl_base_1.0"
    }
  }


// Send
axios.post(`${url}/sdapi/v1/txt2img`, payload)
    .then(response => {
        const imageBase64 = response.data.images[0];
        
        // Decode and save the image.
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        fs.writeFile('output.png', imageBuffer, err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File saved successfully!');
            }
        });
    })
    .catch(error => {
        console.error('Error making request:', error);
    });

    /*
    sd_xl_base_1.0 프롬프트 작성 순서
    https://blog.segmind.com/prompt-guide-for-stable-diffusion-xl-crafting-textual-descriptions-for-image-generation/

    [1] Subject, [2] Detailed Imagery, [3] Environment Description, [4] Mood/Atmosphere Description, [5] Style, [6] Style Execution
    예시 : 

    Prompt: "Model in layered street style, standing against a vibrant graffiti wall, Vivid colors, Mirrorless, 28mm lens, f/2.5 aperture, ISO 400, natural daylight"
    Style: Photographic
    Negative Prompt: out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature.
    Steps:27
    Guidance Scale: 7
    Strength: 1
    Seed: 68420

    */

    /*
    페이로드 예시 

    {
    "prompt": "",
    "negative_prompt": "",
    "styles": [
        "string"
    ],
    "seed": -1,
    "subseed": -1,
    "subseed_strength": 0,
    "seed_resize_from_h": -1,
    "seed_resize_from_w": -1,
    "sampler_name": "string",
    "scheduler": "string",
    "batch_size": 1,
    "n_iter": 1,
    "steps": 50,
    "cfg_scale": 7,
    "width": 512,
    "height": 512,
    "restore_faces": true,
    "tiling": true,
    "do_not_save_samples": false,
    "do_not_save_grid": false,
    "eta": 0,
    "denoising_strength": 0,
    "s_min_uncond": 0,
    "s_churn": 0,
    "s_tmax": 0,
    "s_tmin": 0,
    "s_noise": 0,
    "override_settings": {},
    "override_settings_restore_afterwards": true,
    "refiner_checkpoint": "string",
    "refiner_switch_at": 0,
    "disable_extra_networks": false,
    "firstpass_image": "string",
    "comments": {},
    "enable_hr": false,
    "firstphase_width": 0,
    "firstphase_height": 0,
    "hr_scale": 2,
    "hr_upscaler": "string",
    "hr_second_pass_steps": 0,
    "hr_resize_x": 0,
    "hr_resize_y": 0,
    "hr_checkpoint_name": "string",
    "hr_sampler_name": "string",
    "hr_scheduler": "string",
    "hr_prompt": "",
    "hr_negative_prompt": "",
    "force_task_id": "string",
    "sampler_index": "Euler",
    "script_name": "string",
    "script_args": [],
    "send_images": true,
    "save_images": false,
    "alwayson_scripts": {},
    "infotext": "string"
    }
    */