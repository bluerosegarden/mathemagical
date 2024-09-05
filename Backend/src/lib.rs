mod utils;

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

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

#[derive(Serialize, Deserialize)]
struct MathData {
    pub id: usize,
    pub math_type: String,
    pub min_num: isize,
    pub max_num: isize,
    pub min_rows: isize,
}

#[wasm_bindgen]
pub fn generate_math(
   js_math_data: JsValue
) -> String {
   set_panic_hook()
   let math_data: Vec<MathData> = serde_wasm_bindgen::from_value(js_math_data).unwrap();

   let mut returnStr: String = "".to_string();

   for data in math_data{
      returnStr.push_str(&format!(
              "FROM RUST: {}\n\n{}\t{}\t{}",
              data.math_type,  data.min_num, data.max_num, data.min_rows
          )
          .to_string())
   }

    return returnStr;
}
