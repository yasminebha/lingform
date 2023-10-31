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
  async ngOnInit(): Promise<void> {
    if (this.route) this.formid = this.route.snapshot.paramMap.get('id');
    if (this.formid){
      this.answers = await this.formService.getAnswersByForm(this.formid);
      this.answerNumber= this.answers[0].question[0].answer.length
      

    }
      
  }

  async saveCSVFile() {
    try {
      const blob = this.createCSVFile(this.answers);
      saveAs(await blob, 'responses.csv');
      console.log('CSV file created and downloaded successfully.');
    } catch (error) {
      console.error('Error getting answers:', error);
    }
  }

  async createCSVFile(data: any[]): Promise<Blob | string> {
    const questions = data[0].question;
    const csvData: string[][] = [];

    for (const item of data) {
      const { question } = item;
      for (let i = 0; i < question.length; i++) {
        const answers = question[i].answer;
        for (const answer of answers) {
          const answerValue = answer.data.value;
          if (!csvData[i]) {
            csvData[i] = [];
          }
          csvData[i].push(answerValue);
        }
      }
    }

    let csvContent =
      'timestamp,' +
      questions.map((q: any) => `"${q.questLabel}"`).join(',') +
      '\n';
    const maxAnswerCount = Math.max(...csvData.map((data) => data.length));
    for (let i = 0; i < maxAnswerCount; i++) {
      const row = csvData.map((data) => `"${data[i] || ''}"`).join(',');
      const timestamp = new Date(
        data[0].question[0].answer[i].created_at
      ).toISOString();
      const csvLine = `${timestamp},${row}`;
      csvContent += csvLine + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return blob;
  }
}
