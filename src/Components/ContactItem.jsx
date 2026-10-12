
import {
  UserRound,
  Mail,
  Phone,
  Trash2,
} from "lucide-react";

import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastname, email, phone },
  deleteHandler,
}) {
  return (
    <li className={styles.item}>
      <div className={styles.name}>
        <span className={styles.avatar}>
          <UserRound size={20} />
        </span>

        <span className={styles.value}>
          {name} {lastname}
        </span>
      </div>

      <div className={styles.email}>
        <Mail size={18} aria-hidden="true" />
        <span className={styles.value}>{email}</span>
      </div>

      <div className={styles.phone}>
        <Phone size={18} aria-hidden="true" />
        <span className={styles.value}>{phone}</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => deleteHandler(id)}
          aria-label={`Delete ${name} ${lastname}`}
          title="Delete contact"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}

export default ContactItem;
