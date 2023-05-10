//exemple 9ad raskom mt3 data kifech lezm touseli bech tefhmou kifech te5dmou lcrud
//hedhi tet3ml fl getFormsByUserId() tjiblk forms kol mt3 user mou3ayn ta3mlou feha
//jointure bch table mt3 form yod5l feha table mt3 question
export const formData = [
  {
    //form table
    user_id: 'doqijo5346sfesolp', //ktebt kima yji supabase ygeneri id lel user wa7dou
    form_id: 1,
    title: 'customer feedback',
    description: 'desc1',
    // for theme customization
    headingFontSize: '24',
    headingFontFamily: 'Roboto',
    QuestionFontSize: '18',
    QuestionFontFamily: 'roboto',
    textFontSize: '12',
    textFontFamily: 'roboto',
    color: '#f8f6ff',
    bgColor: '#f8f6ff',
    //hedhom tzidouhom fl supabase fl TABLE FORMULAIRE

    // join question table
    questionElements: [
      {
        //element 1
        type: 'multipleChoice',
        questLabel: 'what is your name',
        required: false,
        quest_meta: {
          options: [
            { key: 1, value: 'elem1' },
            { key: 2, value: 'elem2' },
            { key: 3, value: 'elem3' },
            { key: 4, value: 'elem4' },
          ],
        }, //array can be empty
      },
      {
        //element 2
        type: 'email',
        questLabel: 'Email',
        required: true,
        questOptions: [], //array can be empty
      },
    ],
  },
  //exemple e5r mt3 form e5r 3amlou nafs luser
  {
    //form table
    user_id: 'doqijo5346sfesolp', //ktebt kima yji supabase ygeneri id lel user wa7dou
    form_id: 2,
    title: 'customer feedback1',
    description: 'desc2dzqd',

    headingFontSize: '24',
    headingFontFamily: 'Roboto',
    QuestionFontSize: '18',
    QuestionFontFamily: 'roboto',
    textFontSize: '12',
    textFontFamily: 'roboto',
    color: '#f8f6ff',
    bgColor: '#f8f6ff',

    questionElements: [
      {
        type: 'shortAnswer',
        questLabel: 'what is your name?',
        required: true,
        quest_meta: {},
      },
    ],
  },
];
//efhemtouu
