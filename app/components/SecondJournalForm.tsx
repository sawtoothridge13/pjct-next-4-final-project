'use client';
export default function SecondJournalForm() {
  <form>
    <fieldset>
      <legend>Contact me</legend>
      <div className={styles.formControl}>
        <label>Name</label>
        <input type="name" id="name" placeholder="Enter your name" required />
      </div>

      <div className={styles.formControl}>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className={styles.formControl}>
        <label for="message">Message</label>
        <textarea
          id="message"
          cols="30"
          rows="10"
          placeholder="This was my first day in Saigon"
          required
        />
      </div>
      <input type="submit" value="Send" className={styles.submitButton} />
    </fieldset>
  </form>;
}
