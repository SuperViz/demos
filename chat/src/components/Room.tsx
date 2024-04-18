import { FormElements, useFormElements } from "@superviz/react-sdk";
import { useCallback, useRef } from "react";

export default function Room({ participantName }: { participantName: string }) {
	const { sync } = useFormElements();
	const userMessageRef = useRef<HTMLInputElement>(null);
	const timeout = useRef<NodeJS.Timeout>();

	const displayMessage = useCallback(({ value, userName }: any) => {
		const messages = document.querySelector('.messages');
		const message = document.createElement('div');
		message.innerHTML = `<h3>${userName}</h3><p>${value}</p>`;
	
		message.classList.add('other-user-message');
		messages?.appendChild(message);
	
		const userTyping = document.getElementById('user-typing') as HTMLSpanElement;
		const text = userTyping.innerText;
	
		if (!text) return;
	
		const user = text.replace(' is typing...', '');
	
		if (user === userName) {
		  userTyping.innerHTML = '';
		  userTyping.style.color = '';
		}
	}, [participantName]);

	const displayUserIsTyping = useCallback(({ userName, color }: any) => {
		const userTyping = document.getElementById('user-typing') as HTMLSpanElement;
	
		if (userTyping.innerText) {
		  clearTimeout(timeout.current);
		  timeout.current = setTimeout(() => {
			userTyping.innerHTML = '';
			userTyping.style.color = '';
		}, 2000);
		  return;
		}
	
		timeout.current = setTimeout(() => {
		  userTyping.innerHTML = '';
		  userTyping.style.color = '';
		}, 2000);
	
		userTyping.style.color = color;
		userTyping.innerHTML = `${userName} is typing...`;
	  }, [participantName]);


	const sendMessage = useCallback(() => {
		if (!userMessageRef.current?.value) return;
		console.log('sync')
		sync('message-field');
	  
		const messages = document.querySelector('.messages');
		const messageDiv = document.createElement('div');
		messageDiv.innerHTML = `<h3>${participantName}</h3><p>${userMessageRef.current.value}</p>`;
		messageDiv.classList.add('own-message');
		messages?.appendChild(messageDiv);

		userMessageRef.current!.value = '';
	}, [participantName, userMessageRef.current, sync])

	return (
		<>
			<FormElements fields='message-field' disableOutline disableRealtimeSync onContentSync={displayMessage} onContentChange={displayUserIsTyping} />
			<div className="container">
				<main className="chat">
					<div className="messages">
						<div className="other-user-message">
							<h3>System</h3>
							<p>Type something to send another user a message</p>
						</div>
					</div>
					<div className="bottom-div">
						<span id="user-typing"></span>
						<div className="input-container">
							<input ref={userMessageRef} id="message-field"/>
							<button onClick={()=> sendMessage()}>Send</button>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
