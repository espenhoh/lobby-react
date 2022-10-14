import './ExpenseDate.css';

const ExpenseDate = (props) => {
  const date = props.date;
  const mnd = date.toLocaleString("no-NB", { month: "long" });
  const dag = date.toLocaleString("no-NB", { day: "numeric" });
  const år = date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__day">{dag}</div>
      <div className="expense-date__month">{mnd}</div>
      <div className="expense-date__year">{år}</div>
    </div>
  );
}

export default ExpenseDate;
