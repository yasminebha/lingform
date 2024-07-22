import { FormService } from '@/shared/services/form.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  providers: [DatePipe]
})
export class ResponsesComponent implements OnInit {
  formid: string | null = null;
  submissions: any[] = [];
  data: any[] = [];
  filteredData: any[] = [];
  questionLabels: string[] = [];
  filters: { [label: string]: string } = {};  // Adjusted to hold strings

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    protected datePipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.route) {
      this.formid = this.route.snapshot.paramMap.get('id');
      if (this.formid) {
        this.submissions = await this.formService.getAllSubmission(this.formid);
        const rawData = await this.formService.getSubmissionDetails(this.formid);
        this.data = this.transformDataToArray(rawData);
        this.filteredData = this.data;
        this.extractQuestionLabels();
      }
    }
  }

  transformDataToArray(data: any): any[] {
    return Object.values(data);
  }

  extractQuestionLabels(): void {
    const questionLabelsMap = new Map<string, string>();

    for (const submission of this.data) {
      for (const questId in submission.questions) {
        const question = submission.questions[questId];
        questionLabelsMap.set(questId, question.questionLabel);
      }
    }

    this.questionLabels = Array.from(questionLabelsMap.values());
    this.questionLabels.forEach(label => this.filters[label] = '');
  }

  getAnswer(submission: any, label: string): string {
    for (const questId in submission.questions) {
      const question = submission.questions[questId];
      if (question.questionLabel === label) {
        const answers = Object.values(question.answers).map((answer: any) => this.convertValueToString(answer.data.value));
        return answers.join(', ');
      }
    }
    return '';
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

  applyFilters(): void {
    this.filteredData = this.data.filter(submission => {
      return this.questionLabels.every(label => {
        const selectedFilters = this.filters[label].split(',').map(f => f.trim()).filter(f => f); 
        if (selectedFilters.length === 0) {
          return true;
        }
        const answer = this.getAnswer(submission, label);
        return selectedFilters.some(filter => answer.includes(filter));
      });
    });
  }

  async saveCSVFile(): Promise<void> {
    try {
      const blob = await this.createCSVFile(this.filteredData);
      saveAs(blob, 'responses.csv');
      console.log('CSV file created and downloaded successfully.');
    } catch (error) {
      console.error('Error creating CSV file:', error);
    }
  }

  async createCSVFile(data: any[]): Promise<Blob> {
    const questionLabelsMap = new Map<string, string>();

    for (const submission of data) {
      for (const questId in submission.questions) {
        const question = submission.questions[questId];
        questionLabelsMap.set(questId, question.questionLabel);
      }
    }

    const headers = ['created_at', ...Array.from(questionLabelsMap.values()).map(label => `${label}`)];
    let csvContent = headers.join(',') + '\n';

    for (const submission of data) {
      const answersMap = new Map<string, string>();
      const created_at = this.datePipe.transform(submission.created_at, 'y/MMM/dd HH:mm:ss z');
      const row = [created_at];

      for (const questId in submission.questions) {
        const question = submission.questions[questId];

        for (const answerId in question.answers) {
          const answer = question.answers[answerId];
          answersMap.set(`${questId}`, this.convertValueToString(answer.data.value));
        }
      }

      questionLabelsMap.forEach((label, questId) => {
        row.push(this.escapeCSVValue(answersMap.get(questId) || ''));
      });

      csvContent += row.join(',') + '\n';
    }

    console.log(csvContent);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return blob;
  }

  escapeCSVValue(value: string): string {
    if (value.includes(',')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
