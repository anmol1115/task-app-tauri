use std::fs::File;
use std::io::{Read, Write};
use rand::{distributions::Alphanumeric, Rng};

use crate::projects::Projects;

pub fn gen_id() -> String {
    rand::thread_rng()
    .sample_iter(&Alphanumeric)
    .take(7)
    .map(char::from)
    .collect()
}

#[tauri::command]
pub fn select_project(project_id: String) {
    let mut file = File::open("../db.json").expect("File not found");
    let mut content = String::new();

    file.read_to_string(&mut content).expect("Error reading from file");
    let mut projects: Projects = serde_json::from_str(&content).expect("Failed to pass to struct");
    projects.update_selected_project(project_id);

    let mut file = File::create("../db.json").expect("File not found");
    let json_data = serde_json::to_string_pretty(&projects).expect("Failed to parse to json");
    file.write_all(json_data.as_bytes()).expect("Failed to write to file");
}

#[tauri::command]
pub fn unselect_project() {
    let mut file = File::open("../db.json").expect("File not found");
    let mut content = String::new();

    file.read_to_string(&mut content).expect("Error reading from file");
    let mut projects: Projects = serde_json::from_str(&content).expect("Failed to parse to struct");

    projects.unselect_project();
    let mut file = File::create("../db.json").expect("File not found");
    let json_data = serde_json::to_string_pretty(&projects).expect("Failed to parse to json");
    file.write_all(json_data.as_bytes()).expect("Failed to write to file");
}