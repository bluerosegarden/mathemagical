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
pub fn grab_string() -> String {
    return "This Is A Strong String".to_string();
}

#[wasm_bindgen]
pub fn generate_math(
    math_type: String,
    problem_count: isize,
    min_number: isize,
    max_num: isize,
    min_elements: isize,
) -> String {
    return format!(
        "FROM RUST: {}\n\n{}\t{}\t{}\t{}",
        math_type, problem_count, min_number, max_num, min_elements
    )
    .to_string();
}
