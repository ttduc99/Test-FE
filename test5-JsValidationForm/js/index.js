let sv=[
    {
        id:1,
        name:'Duc',
        scores:'6'
    },
    {
        id:2,
        name:'Anh',
        scores:'8'
    },
    {
        id:3,
        name:'Sut',
        scores:'10'
    },
    {
        id:4,
        name:'Dat',
        scores:'9'
    }
]
congDiem=(scores)=>{
  return scores=parseFloat(scores) +1;
}
// console.log('list sv:', sv)

for(let i=0; i<sv.length;i++){
   
    // if(sv[i].scores>8){
    //     console.log(sv[i].name,': Da dat loai gioi')
    // }
    // else{ console.log('Loai duoi gioi')}
    sv[i].scores=congDiem(sv[i].scores)
  
}
// console.log('Diem sinh vien', sv)

