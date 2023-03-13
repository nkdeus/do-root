

var stageItems = [
    {
    label : 'intro',
    items : [
        {
          type:'html',
          clazz:'t-0'
        },
        {
          type:'html',
          clazz:'t-1'
        },
        {
          type:'html',
          clazz:'t-2'
        },
        {
          type:'html',
          clazz:'t-3'
        },
        {
          type:'html',
          clazz:'t-4'
        }
    ]
    },
    {
    label  : 'branch',
    items : [
        {
          type:'svg',
          clazz:'l-0'
        },
        {
          type:'html',
          clazz:'c-0'
        },
        {
          type:'svg',
          clazz:'l-1'
        },
        {
          type:'html',
          clazz:'c-1'
        },
        {
          type:'svg',
          clazz:'l-2'
        },
        {
          type:'html',
          clazz:'c-2'
        },
        {
          type:'svg',
          clazz:'l-3'
        },
        {
          type:'html',
          clazz:'c-3'
        },
        {
          type:'svg',
          clazz:'l-4'
        },
        {
          type:'html',
          clazz:'c-4'
        }
    ]
    }
]

console.log("ICI ",stageItems);

stageItems.forEach((phase, index) => {
    console.log(`Current phase: ${index}`);
    console.log(phase.label);
    phase.items.forEach((item, index) => {
        console.log(item.type,item.clazz);
    });
});