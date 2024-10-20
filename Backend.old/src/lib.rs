mod utils;
use crate::utils::set_panic_hook;
use serde::{Deserialize, Serialize};
use serde_json;
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

#[derive(Serialize, Deserialize)]
struct MathData {
    pub id: usize,
    pub math_type: String,
    pub min_num: isize,
    pub max_num: isize,
    pub min_rows: isize,
}

#[derive(Serialize, Deserialize, Debug)]
enum MathProblemTypes {
    Addition,
    Subtraction,
    Multiplication,
    Division,
}

#[derive(Serialize, Deserialize)]
struct MathProblem {
    pub math_type: MathProblemTypes,
    pub problem_body: String,
    pub problem_preamble: Option<String>,
    pub problem_answer: String,
}

#[wasm_bindgen]
pub fn init_error_logs() {
    set_panic_hook();
}

#[wasm_bindgen]
pub fn generate_math(js_math_data: JsValue) -> String {
    let math_data: Vec<MathData> = serde_wasm_bindgen::from_value(js_math_data).unwrap();

    let mut math_problems: Vec<MathProblem> = vec![];
    for data in math_data {
        let data_math_type: &str = &data.math_type;
        let math_type = match data_math_type {
            "addition" => MathProblemTypes::Addition,
            "subtraction" => MathProblemTypes::Subtraction,
            "multiplication" => MathProblemTypes::Multiplication,
            "division" => MathProblemTypes::Division,
            _ => panic!("Was Expecting Valid Math Type"),
        };

        //The following should be generated using another func, depending on the math_type
        let problem_body =
            format!("{}\t{}\t{}", data.min_num, data.max_num, data.min_rows).to_string();
        let problem_preamble = None;
        let problem_answer = "42".to_string();
        math_problems.push(MathProblem {
            math_type,
            problem_body,
            problem_preamble,
            problem_answer,
        });
    }

    //return serde_json::to_string(&math_problems).unwrap();
    return format_math_data_to_typst(math_problems);
}

fn format_math_data_to_typst(math_problems: Vec<MathProblem>) -> String {
    let mut return_str = "= MATH problems".to_string();

    //TODO prob would be better to serialize this as a json and then pass that to a typst template that's been defined and pasted in here somewhere, but for now we're just getting something basic working

    for problem in math_problems {
        let problem_type = format!("== {:?}", problem.math_type).to_string();
        let problem_body = format!("- {}", problem.problem_body).to_string();
        let problem_answer = format!("- answer: {}", problem.problem_answer).to_string();

        let problem_string =
            format!("{}\n{}\n{}", problem_type, problem_body, problem_answer).to_string();

        return_str.push_str(&problem_string)
    }
    return_str
}
