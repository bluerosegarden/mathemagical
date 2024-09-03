mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(s: &str) {
    alert(&format!("{}", s));
}


#[wasm_bindgen]
pub fn grab_string() -> String{
    return "This Is A Strong String".to_string();
}
