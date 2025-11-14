export default function TaskTableForm() {
  return (
    <form>
      <label>
        Task Name:
        <input type="text" name="taskName" />
      </label>
      <label>
        Status:
        <input type="text" name="status" />
      </label>
      <label>
        Priority:
        <input type="text" name="priority" />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}
