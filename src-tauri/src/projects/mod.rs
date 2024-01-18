use serde::{Serialize, Deserialize};

use crate::tasks::Task;
use crate::util::{gen_id, load_from_json, load_to_json};

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

    fn delete_project(&mut self, project_id: String) {
        let mut idx = 0;
        while idx < self.projects.len() {
            if self.projects[idx].id == project_id {
                self.projects.remove(idx);
                break;
            }
            idx += 1;
        }
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

    pub fn delete_task(&mut self, task_id: String) {
        let mut idx = 0;
        while idx < self.tasks.len() {
            if self.tasks[idx].get_id() == task_id {
                self.tasks.remove(idx);
                break;
            }
            idx += 1;
        }
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
    let mut projects = load_from_json();
    
    let new_project = Project{id: gen_id(), name: project_name, tasks: vec![]};
    projects.add_project(new_project);

    load_to_json(&projects);
}

#[tauri::command]
pub fn get_projects() -> String {
    let projects = load_from_json();
    let projects = projects.projects;

    serde_json::to_string_pretty(&projects).expect("Failed to parse to json")
}

#[tauri::command]
pub fn delete_project(project_id: String) {
    let mut projects = load_from_json();
    projects.delete_project(project_id);

    load_to_json(&projects);
}