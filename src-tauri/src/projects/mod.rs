use std::fs::File;
use std::io::{Read, Write};
use serde::{Serialize, Deserialize};

use crate::tasks::Task;
use crate::util::gen_id;

#[derive(Debug, Deserialize, Serialize)]
pub struct Projects {
    selected_project: Option<String>,
    projects: Vec<Project>
}

impl Projects {
    fn add_project(&mut self, new_project: Project) {
        let _ = self.projects.push(new_project);
    }

    pub fn update_selected_project(&mut self, id: String) {
        self.selected_project = Some(id)
    }

    pub fn get_selected_project(&mut self) -> &mut Project {
        for project in &mut self.projects {
            if project.get_id() == *self.selected_project.as_ref().unwrap() {
                return project
            }
        }
        unreachable!()
    }

    pub fn unselect_project(&mut self) {
        self.selected_project = None;
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Project {
    #[serde(rename="_id")]
    id: String,
    name: String,
    tasks: Vec<Task>
}

impl Project {
    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn add_task(&mut self, new_task: Task) {
        let _ = self.tasks.push(new_task);
    }
}

#[tauri::command]
pub async fn new_project_window(handle: tauri::AppHandle) {
    let _new_window = tauri::WindowBuilder::new(
        &handle,
        "create_project_window",
        tauri::WindowUrl::App("../../../src/static/createProject.html".into())
    )
    .title("Create Project")
    .resizable(false)
    .inner_size(300.0, 110.0)
    .build().unwrap();
}

#[tauri::command]
pub fn create_project(project_name: String) {
    let mut file = File::open("../db.json").expect("File not found");
    let mut content = String::new();
    
    file.read_to_string(&mut content).expect("Error reading from file");
    let mut projects: Projects = serde_json::from_str(&content).expect("Failed to pass to struct");
    
    let mut file = File::create("../db.json").expect("File not found");
    let new_project = Project{id: gen_id(), name: project_name, tasks: vec![]};
    projects.add_project(new_project);

    let json_data = serde_json::to_string_pretty(&projects).expect("Failed to parse to json");
    file.write_all(json_data.as_bytes()).expect("Failed to write to file");
}

#[tauri::command]
pub fn get_projects() -> String {
    let mut file = File::open("../db.json").expect("File not found");
    let mut content = String::new();

    file.read_to_string(&mut content).expect("Error reading from file");
    let projects: Projects = serde_json::from_str(&content).expect("Failed to pass to struct");
    let projects = projects.projects;

    serde_json::to_string_pretty(&projects).expect("Failed to parse to json")
}