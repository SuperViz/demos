import { useRealtime } from "@superviz/react-sdk";
import { FormEvent, useEffect, useRef, useState } from "react";

export function Form({ participantId }: { participantId: string }) {  
  const form = useRef<HTMLFormElement>(null);
  const [enableButton, setEnableButton] = useState(false);
  const { publish, subscribe } = useRealtime();

  const onSubmit = (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    publish('submit', null);
  };

  useEffect(()=> {
    subscribe('submit', (e: any)=> {
      if (e.participantId === participantId) return;
      const button = form.current?.querySelector('button');
      button!.click();
      button!.focus();
    })

    subscribe('enable', ()=> {
      setEnableButton(true);
    });

    subscribe('disable', ()=> {
      setEnableButton(false);
    });
  }, []);

  const onChange = ()=> {
    if (!form.current) return;

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());
    
    let disableButton = false;
    Object.values(data).forEach((value)=> {
      if (value) return;
      disableButton = true;
    })

    if (disableButton) {
      publish('disable', null);
      return;
    }

    publish('enable', null);
  }

  return (
    <> 
      <div className='form-container' id="form-container">
        <h2 className="tip">Tip: try answering this form in two devices at the same time</h2>
        <div className="steps-container">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <h3>Personal information</h3>

        <form ref={form} onChange={onChange} onSubmit={onSubmit}>
          <aside>
            <span className="field">
              <label htmlFor="participant-name">Name</label>
              <input name="name" id="participant-name" type="text" placeholder="Your full name here" />
            </span>
            <div className="double-fields">
              <span className="field">
                <label htmlFor="company-name">Company</label>
                <input name="company" id="company-name" type="text" placeholder="Company name" />
              </span>
              <span className="field">
                <label htmlFor="participant-role">Your role</label>
                <input name="role" id="participant-role" type="text" placeholder="Your role" />
              </span>
            </div>
            <span className="field">
              <label htmlFor="participant-email">Email</label>
              <input name="email" id="participant-email" type="email" placeholder="Your professional email address" />
            </span>
          </aside>
          <div className="language-field">
            <p className="label">Language</p>
            <span className="field">
              <input name="language" type="radio" defaultChecked id="participant-language-en"/>
              <label htmlFor="participant-language-en">English</label>
            </span>
            <span className="field">
              <input name="language" type="radio" id="participant-language-es"/>
              <label htmlFor="participant-language-es">Spanish</label>
            </span>
          </div>

          <button type="submit" disabled={!enableButton} className="submit-button">Save</button>
        </form>
      </div>
    </>
  );
}