import React from "react";

export default function Footer() {
  const date = new Date();
  return (
    <div id="footer">
      <h1>All rights reserved | © Picsart Academy</h1>
      <h4>{date.getFullYear()}</h4>
    </div>
  );
}
