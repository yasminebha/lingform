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
  formid: string | null = null;
  submissions: any[] = [];
  csvData: any[] = [];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.route) {
      this.formid = this.route.snapshot.paramMap.get('id');
      if (this.formid) {
        // Fetch submissions for the form
        this.submissions = await this.formService.getAllSubmission(this.formid);
        
        // Fetch submission details for creating CSV
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
    // Step 1: Extract unique question labels for CSV header
    const questionLabels = [...new Set(data.map(item => item.questionlabel))];

    // Step 2: Group answers by created_at timestamp
    const groupedAnswers: { [key: string]: any } = {};
    data.forEach(answer => {
      const createdAt = new Date(answer.created_at).toISOString();
      if (!groupedAnswers[createdAt]) {
        groupedAnswers[createdAt] = { timestamp: createdAt, answers: {} };
      }
      groupedAnswers[createdAt].answers[answer.questionlabel] = answer.data.value;
    });

    // Step 3: Prepare CSV content
    let csvContent = 'timestamp,' + questionLabels.map(label => `"${label}"`).join(',') + '\n';

    Object.values(groupedAnswers).forEach(group => {
      const row = `${group.timestamp},${questionLabels.map(label => `"${group.answers[label] || ''}"`).join(',')}`;
      csvContent += row + '\n';
    });

    // Step 4: Create Blob object for download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return blob;
  }
}
