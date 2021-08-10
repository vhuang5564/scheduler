import React from "react"
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <h2>Are you sure you want to delete?</h2>
        <br/>
        <br/>
        <br/>
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  )
}