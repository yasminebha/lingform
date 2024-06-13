import { FormService } from '@/shared/services/form.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
})
export class ResponsesComponent implements OnInit {
  answerNumber: number = 0;
  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {}
  formid: string | null = '';
  answers: any[]= [];
  submissions :any=[]
  async ngOnInit(): Promise<void> {
    if (this.route) this.formid = this.route.snapshot.paramMap.get('id');
    if (this.formid) {
    this.submissions= this.formService.getAllSubmission(this.formid)
    }
    console.log(this.submissions);
    
  }

  async saveCSVFile() {
    try {
      const blob = await this.createCSVFile(this.answers);
      saveAs(blob, 'responses.csv');
      console.log('CSV file created and downloaded successfully.');
    } catch (error) {
      console.error('Error creating CSV file:', error);
    }
  }

  async createCSVFile(data: any[]): Promise<Blob | string> {
    // Step 1: Extract questions and ensure unique labels for columns
    const questionLabels = data[0].question.map((q: any) => q.questLabel);
    
    // Step 2: Group answers by created_at
    const groupedAnswers: { [key: string]: any } = {};
    data.forEach(item => {
      item.question.forEach((q: any, qIndex: number) => {
        q.answer.forEach((answer: any) => {
          const createdAt = new Date(answer.created_at).toISOString();
          if (!groupedAnswers[createdAt]) {
            groupedAnswers[createdAt] = { timestamp: createdAt, answers: Array(questionLabels.length).fill('') };
          }
          // If the answer is an array (e.g., multiple choice), join it with commas
          const answerValue = Array.isArray(answer.data.value) ? answer.data.value.join(', ') : answer.data.value;
          groupedAnswers[createdAt].answers[qIndex] = answerValue;
        });
      });
    });
  
    // Step 3: Prepare CSV content
    let csvContent = 'timestamp,' + questionLabels.map((label: string) => `"${label}"`).join(',') + '\n';
  
    Object.values(groupedAnswers).forEach((group: any) => {
      const row = `${group.timestamp},${group.answers.map((ans: string) => `"${ans}"`).join(',')}`;
      csvContent += row + '\n';
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return blob;
  }
}
