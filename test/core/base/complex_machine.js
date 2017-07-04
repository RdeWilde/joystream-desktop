import base from '../../../src/core/BaseMachine'

//     X       Y         [root]
//    /|\     /|\
//   a b c   a b c       [substate1]
//  /|\       /|\
// A B C     A B C       [substate2]

var substate2 = new base({
  initialState: 'A',
  states: {
    A: {
    },
    B: {
    },
    C: {
    }
  }
})

var substate1 = new base({
  initialState: 'a',
  states: {
    a: {
      _child: substate2
    },
    b: {
    },
    c: {
    }
  }
})

var root = new base({
  initialState: 'X',
  states: {
    'X': {
      _child: substate1
    },
    'Y': {
    }
  }
})

export default root
