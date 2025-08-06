import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { ChatService } from '../services/chat.service';

import { TextFieldModule } from '@angular/cdk/text-field';
import { environment } from '../../environments/environment';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    MatSelectModule,
    FormsModule 
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {

  // stores conversation history for each model
  modelConversations: { [modelName: string]: Message[] } = {};

  modelOptions = [
    { name: 'v0.02', apiUrl: environment.apiUrlv02},
    { name: 'v0.021', apiUrl: environment.apiUrlv021},
    { name: 'v0.021_5e-5', apiUrl: environment.apiUrlv0215E5},
    { name: 'v0.01-16E-32Lora_R', apiUrl: environment.apiUrlv01R32}
  ]
  selectedModel = this.modelOptions[0]; //default to first model

  chatForm: FormGroup;
  messages: Message[] = [];
  loading: boolean = false;

  // Reference to the messages container element
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private fb: FormBuilder, private chatService: ChatService) {
    // Start with the default assistant prompt.
    this.messages.push({ role: 'assistant', content: 'Hi, what’s your first and last name?' });
    this.chatForm = this.fb.group({
      userMessage: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngAfterViewChecked(): void {
    // Scroll to the bottom every time the view has been updated
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling:', err);
    }
  }

  sendMessage(): void {
    if (this.chatForm.invalid) return;
    const userMessage = this.chatForm.value.userMessage.trim();
    if (!userMessage) return;

    // Append the user's message.
    this.messages.push({ role: 'user', content: userMessage });
    this.chatForm.reset();

    // Build the payload with the conversation history.
    const payload = {
      input: {
        prompt: this.messages,
        sampling_params: {
          max_tokens: 4096,
          temperature: 0.7,
          top_p: 1,
          stop: [ "<|eot_id|>", "</s>" ]
        }
      }
    };

    this.loading = true;
    this.chatService.sendChat(payload, this.selectedModel.apiUrl).subscribe({
      next: (response) => {
        const tokens = response?.output?.[0]?.choices?.[0]?.tokens;
        if (tokens && tokens.length > 0) {
          this.messages.push({ role: 'assistant', content: tokens.join(' ') });
        }

        this.modelConversations[this.selectedModel.name] = [...this.messages];
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.loading = false;
      }
    });
  }

  copyConversation(): void {
    // Format each message with a label.
    const conversationText = this.messages
      .map(message => {
        const label = message.role === 'assistant' ? 'Assistant' : 'User';
        return `${label}: ${message.content}`;
      })
      .join('\n');
      
    // Use the Clipboard API to copy the text.
    navigator.clipboard.writeText(conversationText)
      .then(() => {
        // Optionally, show feedback to the user (toast, snackbar, etc.)
        console.log('Conversation copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  onModelChange(): void {
    const modelName = this.selectedModel.name;
  
    if (this.modelConversations[modelName]) {
      // If we already have conversation for this model, restore it
      this.messages = [...this.modelConversations[modelName]];
    } else {
      // First time selecting this model
      this.messages = [
        { role: 'assistant', content: 'Hi, what’s your first and last name?' }
      ];
      // Save it immediately
      this.modelConversations[modelName] = [...this.messages];
    }
  }
}
