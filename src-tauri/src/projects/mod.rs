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