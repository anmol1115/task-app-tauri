#[tauri::command]
pub async fn new_task_window(handle: tauri::AppHandle) {
    let _new_window = tauri::WindowBuilder::new(
        &handle,
        "create_task_window",
        tauri::WindowUrl::App("../../../src/static/createTask.html".into())
    )
    .title("Create Task")
    .resizable(false)
    .inner_size(300.0, 150.0)
    .build().unwrap();
}