import { FormService } from '@/shared/services/form.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  providers:[DatePipe]
})
export class ResponsesComponent implements OnInit {
  formid: string | null = null;
  submissions: any[] = [];
  csvData: any[] = [];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private datePipe:DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.route) {
      this.formid = this.route.snapshot.paramMap.get('id');
      if (this.formid) {
        this.submissions = await this.formService.getAllSubmission(this.formid);
        

        this.csvData = await this.formService.getSubmissionDetails(this.formid);
 
      }
    }
    console.log(this.csvData);
  }

  async saveCSVFile(): Promise<void> {
    try {
      const blob = await this.createCSVFile(this.csvData);
      saveAs(blob, 'responses.csv');
      console.log('CSV file created and downloaded successfully.');
    } catch (error) {
      console.error('Error creating CSV file:', error);
    }
  }

  async createCSVFile(data: any[]): Promise<Blob> {
    const questionLabelsMap = new Map<string, string>();


    for (const submissionId in data) {
      const submission = data[submissionId];
      for (const questId in submission.questions) {
        const question = submission.questions[questId];
        questionLabelsMap.set(questId, question.questionLabel);
      }
    }


    const headers = ['created_at', ...Array.from(questionLabelsMap.values()).map(label => `${label}`)];

    let csvContent = headers.join(',') + '\n';

    for (const submissionId in data) {
      const answersMap = new Map<string, string>();
      const submission = data[submissionId];
      const created_at=this.datePipe.transform(submission.created_at,'y/MMM/dd   HH:mm:ss z')
      const row = [created_at];

      for (const questId in submission.questions) {
        const question = submission.questions[questId];

        for (const answerId in question.answers) {
          const answer = question.answers[answerId];
          answersMap.set(`${questId}_${submissionId}`, this.convertValueToString(answer.data.value));
        }
      }

      questionLabelsMap.forEach((label, questId) => {
        row.push(this.escapeCSVValue(answersMap.get(`${questId}_${submissionId}`) || ''));
      });

      csvContent += row.join(',') + '\n';
    }

    console.log(csvContent);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return blob;
  }

  convertValueToString(value: any): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${key}:${val}`)
        .join(', ');
    } else {
      return String(value);
    }
  }

  escapeCSVValue(value: string): string {
    if (value.includes(',')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

 
}
