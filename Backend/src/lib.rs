mod utils;
use crate::utils::set_panic_hook;
use rand::Rng;
use serde::{Deserialize, Serialize};
use serde_json;
use std::rand::Rng;
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
struct MathRange {
    pub start: f64,
    pub end: f64,
}

#[derive(Serialize, Deserialize)]
enum MathStructureSegment {
    Element { id: usize },
    LogicalSign(String),
}


#[derive(Serialize, Deserialize)]
struct MathElementProp {
    pub id: usize,
    pub range: MathRange,
    pub precision: i32,
}

#[derive(Serialize, Deserialize)]
struct MathAnswerProp {
    pub precision: i32,
    pub range: MathRange,
}
#[derive(Serialize, Deserialize)]
struct MathElement {
    pub id: usize,
    pub range: MathRange,
    pub precision: i32,
    pub value: f64,
    pub variable_label: String,
}

#[derive(Serialize, Deserialize)]
struct MathAnswer {
    pub precision: i32,
    pub range: MathRange,
    pub value: f64,
}

#[derive(Serialize, Deserialize)]
struct MathData {
    pub id: usize,
    pub math_type: String,
    pub min_num: isize,
    pub max_num: isize,
    pub min_elements: isize,
    pub math_element_properties: MathElementProp,
    pub math_answer_properties: MathAnswerProp
}

struct Addition;


#[derive(Debug, Serialize, Deserialize)]
enum MathType{
    AdditionType,
    SubtractionType
}

#[derive(Serialize, Deserialize)]
struct MathProblem {
    pub id: usize,
    pub math_type: MathType,
    pub elements: Vec<MathElement>,
    pub structure: Vec<MathStructureSegment>,
    pub answer: MathAnswer,
    pub body: String,
    pub preamble: String,
}

#[wasm_bindgen]
pub fn init_error_logs() {
    set_panic_hook();
}

fn round_to_precision(value: f64, precision: i32) -> f64{
    return (value * 10_f64.powi(precision)).round() / 10_f64.powi(precision);
}

trait MathGeneration {
    fn generate_answer(answer: MathAnswerProp) -> MathAnswer;
    fn generate_elements(elements: Vec<MathElementProp>) -> Vec<MathElement>;
    fn generate_structure(
        elements: Vec<MathElementProp>,
    ) -> Vec<MathStructureSegment>;
}

impl MathGeneration for Addition {
    fn generate_answer(answer: MathAnswerProp) -> MathAnswer {
        let mut rng = rand::thread_rng();
        let initial_value = rng.gen_range(answer.range.start..answer.range.end);
        let value =
            (initial_value * 10_f64.powi(answer.precision)).round() / 10_f64.powi(answer.precision);

        return MathAnswer {
            range: MathRange {
                start: answer.range.start,
                end: answer.range.end,
            },
            value,
            precision: answer.precision,
        };
    }

    fn generate_elements(elements: Vec<MathElementProp>, answer: f64) -> Vec<MathElement> {
        let mut new_elements: Vec<MathElement> = vec![];
        let mut rng = rand::thread_rng();

        for element in elements {

            let mut limit: f64;

            if (answer < element.range.end){
                limit = answer;
            } else {
                limit = element.id;
            }

            let initial_value = rng.gen_range(element.range.start..limit);

            let value = round_to_precision(initial_value, element.precision);

            new_elements.push(MathElement {
                id: element.id,
                range: MathRange {
                    start: element.range.start,
                    end: element.range.end,
                },
                value,
                variable_label: "".to_string(),
                precision: element.precision,
            })
        }
        return new_elements;
    }

    fn generate_structure(elements: Vec<MathElementProp>) -> Vec<MathStructureSegment> {
        let mut structure: Vec<MathStructureSegment> = vec![];
        for element in elements{
            structure.push(MathStructureSegment::Element { id: (element.id) });
        }
        return structure;
    }
}

#[wasm_bindgen]
pub fn generate_math(js_math_data: JsValue) -> String {
    let math_data: Vec<MathData> = serde_wasm_bindgen::from_value(js_math_data).unwrap();

    let mut math_problems: Vec<MathProblem> = vec![];
    for data in math_data {
        let data_math_type: &str = &data.math_type;
        let math_type = match data_math_type {
            "addition" => MathType::AdditionType,
//            "subtraction" => MathProblemTypes::Subtraction,
//            "multiplication" => MathProblemTypes::Multiplication,
//            "division" => MathProblemTypes::Division,
            _ => panic!("Was Expecting Valid Math Type"),
        };

        let answer = match math_type{
           MathType::AdditionType => Addition::generate_answer(data.math_answer_properties),
          _ => panic!("How did this happen?"),
        };

        //The following should be generated using another func, depending on the math_type
        //let problem_body =
        //    format!("{}\t{}\t{}", data.min_num, data.max_num, data.min_elements).to_string();


        let problem_preamble = None;
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
